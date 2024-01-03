// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
  }
  
  export type UpdateUserParams = {
    firstName: string
    lastName: string
    username: string
    photo: string
  }
  
  // ====== BOOK PARAMS
  export type CreateBookParams = {
    userId: string
    book: {
      title: string
      description: string
      writer: string
      poster: string
      imageUrl: string
      categoryId: string
      price: string
      isFree: boolean
      url: string
    }
    path: string
  }
  
  export type UpdateBookParams = {
    userId: string
    book: {
      _id: string
      title: string
      imageUrl: string
      writer: string
      poster: string
      description: string
      categoryId: string
      price: string
      isFree: boolean
      url: string
    }
    path: string
  }
  
  export type DeleteBookParams = {
    bookId: string
    path: string
  }
  
  export type GetAllBooksParams = {
    query: string
    category: string
    limit: number
    page: number
  }
  
  export type GetBooksByUserParams = {
    userId: string
    limit?: number
    page: number
  }
  
  export type GetRelatedBooksByCategoryParams = {
    categoryId: string
    bookId: string
    limit?: number
    page: number | string
  }
  
  export type Book = {
    _id: string
    title: string
    writer: string
    poster: string
    description: string
    price: string
    isFree: boolean
    imageUrl: string
    url: string
    organizer: {
      _id: string
      firstName: string
      lastName: string
    }
    category: {
      _id: string
      name: string
    }
  }
  
  // ====== CATEGORY PARAMS
  export type CreateCategoryParams = {
    categoryName: string
  }
  
  // ====== ORDER PARAMS
  export type CheckoutOrderParams = {
    bookTitle: string
    bookId: string
    price: string
    isFree: boolean
    buyerId: string
  }
  
  export type CreateOrderParams = {
    stripeId: string
    bookId: string
    buyerId: string
    totalAmount: string
    createdAt: Date
  }
  
  export type GetOrdersByBookParams = {
    bookId: string
    searchString: string
  }
  
  export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
  }
  
  // ====== URL QUERY PARAMS
  export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }
  
  export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
  