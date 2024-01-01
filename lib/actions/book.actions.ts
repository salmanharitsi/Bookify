'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import Book from '@/lib/database/models/book.model'
import User from '@/lib/database/models/user.model'
import Category from '@/lib/database/models/category.model'
import { handleError } from '@/lib/utils'

import {
  CreateBookParams,
  UpdateBookParams,
  DeleteBookParams,
  GetAllBooksParams,
  GetBooksByUserParams,
  GetRelatedBooksByCategoryParams,
} from '@/types'

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } })
}

const populateBook = (query: any) => {
  return query
    .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
    .populate({ path: 'category', model: Category, select: '_id name' })
}

// CREATE
export async function createBook({ userId, book, path }: CreateBookParams) {
  try {
    await connectToDatabase()

    let organizer = null;
    if (userId) {
      organizer = await User.findById(userId);
      if (!organizer) throw new Error('Organizer not found');
    }

    const newBook = await Book.create({ ...book, category: book.categoryId, organizer: organizer ? userId : null })
    revalidatePath(path)

    // const organizer = await User.findById(userId)
    // if (!organizer) throw new Error('Organizer not found')

    // const newBook = await Book.create({ ...book, category: book.categoryId, organizer: userId })
    // revalidatePath(path)

    return JSON.parse(JSON.stringify(newBook))
  } catch (error) {
    handleError(error)
  }
}

// GET ONE BOO BY ID
export async function getBookById(bookId: string) {
  try {
    await connectToDatabase()

    const book = await populateBook(Book.findById(bookId))

    if (!book) throw new Error('Book not found')

    return JSON.parse(JSON.stringify(book))
  } catch (error) {
    handleError(error)
  }
}

// UPDATE
export async function updateBook({ userId, book, path }: UpdateBookParams) {
  try {
    await connectToDatabase()

    const bookToUpdate = await Book.findById(book._id)
    if (!bookToUpdate || bookToUpdate.organizer.toHexString() !== userId) {
      throw new Error('Unauthorized or book not found')
    }

    const updatedBook = await Book.findByIdAndUpdate(
      book._id,
      { ...book, category: book.categoryId },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedBook))
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export async function deleteBook({ bookId, path }: DeleteBookParams) {
  try {
    await connectToDatabase()

    const deletedBook = await Book.findByIdAndDelete(bookId)
    if (deletedBook) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}

// GET ALL BOOK
export async function getAllBooks({ query, limit = 6, page, category }: GetAllBooksParams) {
  try {
    await connectToDatabase()

    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
    const categoryCondition = category ? await getCategoryByName(category) : null
    const conditions = {
      $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
    }

    const skipAmount = (Number(page) - 1) * limit
    const booksQuery = Book.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const books = await populateBook(booksQuery)
    const booksCount = await Book.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(books)),
      totalPages: Math.ceil(booksCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}

// GET BOOKS BY ORGANIZER
export async function getBooksByUser({ userId, limit = 6, page }: GetBooksByUserParams) {
  try {
    await connectToDatabase()

    const conditions = { organizer: userId }
    const skipAmount = (page - 1) * limit

    const booksQuery = Book.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const books = await populateBook(booksQuery)
    const booksCount = await Book.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(books)), totalPages: Math.ceil(booksCount / limit) }
  } catch (error) {
    handleError(error)
  }
}

// GET RELATED BOOKS: BOOKS WITH SAME CATEGORY
export async function getRelatedBooksByCategory({
  categoryId,
  bookId,
  limit = 3,
  page = 1,
}: GetRelatedBooksByCategoryParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ category: categoryId }, { _id: { $ne: bookId } }] }

    const booksQuery = Book.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const books = await populateBook(booksQuery)
    const booksCount = await Book.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(books)), totalPages: Math.ceil(booksCount / limit) }
  } catch (error) {
    handleError(error)
  }
}
