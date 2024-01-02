import { IBook } from '@/lib/database/models/book.model'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type CardProps = {
  book: IBook,
  hidePrice?: boolean
}

const Card = ({ book, hidePrice }: CardProps) => {
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link 
        href={`/books/${book._id}`}
        style={{backgroundImage: `url(${book.imageUrl})`}}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />

      <div
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      > 
       {!hidePrice && <div className="flex gap-2">
          <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
            {book.isFree ? 'FREE' : `$${book.price}`}
          </span>
          <p className="p-semibold-14 rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
            {book.category.name}
          </p>
        </div>}

        <Link href={`/books/${book._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{book.title}</p>
        </Link>

        
      </div>
    </div>
  )
}

export default Card