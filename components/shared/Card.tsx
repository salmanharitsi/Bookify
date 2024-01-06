import { IBook } from '@/lib/database/models/book.model'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'

type CardProps = {
  book: IBook,
  hidePrice?: boolean,
  hasOrderLink?: boolean
}

const Card = ({ book, hidePrice, hasOrderLink }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isBookPoster = userId === book.organizer._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/books/${book._id}`}
        style={{ backgroundImage: `url(${book.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />

      {/* IS BOOK POSTER ... */}

      {isBookPoster && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/books/${book._id}/update`}>
            <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
          </Link>

          <DeleteConfirmation bookId={book._id} />
        </div>
      )}

      <div
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-3"
      >
        {!hidePrice && <div className="flex gap-2">
          <span className="p-semibold-14 rounded-full bg-green-100 px-4 py-1 text-green-60">
            {book.isFree ? 'FREE' : `Rp. ${book.price}`}
          </span>
          <p className="p-semibold-14 rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
            {book.category.name}
          </p>
        </div>}

        <p className="p-medium-14 p-medium-16 text-grey-500">
          <i>Author: {book.writer}</i>
        </p>

        <Link href={`/books/${book._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{book.title}</p>
        </Link>

        <div className='flex-1'></div>

        <div className="flex-between w-full">
          <p className="p-medium-12 md:p-medium-14 text-grey-600">
            Post by: <span className="text-primary-500">{book.organizer.firstName} {book.organizer.lastName}</span> 
          </p>
        </div>
      </div>
    </div>
  )
}

export default Card