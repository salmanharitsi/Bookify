import Collection from '@/components/shared/Collection';
import { getBookById, getRelatedBooksByCategory } from '@/lib/actions/book.actions'
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types'
import Image from 'next/image';
import Link from 'next/link';

const BookDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const book = await getBookById(id);

  const relatedBooks = await getRelatedBooksByCategory({
    categoryId: book.category._id,
    bookId: book._id,
    page: searchParams.page as string,
  })

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <div className='max-h-[80vh] md:max-h-[100%]'>
            <Image
              src={book.imageUrl}
              alt="hero image"
              width={1000}
              height={1000}
              className="h-[100%] md:h-full min-h-[300px] object-cover object-center"
            />
          </div>
          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className='h2-bold'>{book.title}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    {book.isFree ? 'FREE' : `Rp. ${book.price}`}
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {book.category.name}
                  </p>
                </div>

              </div>
            </div>

            {/* <CheckoutButton event={event} /> */}

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">What You'll Read:</p>
              <p className="p-medium-16 lg:p-regular-18">{book.description}</p>

              <p className="p-bold-20 text-grey-600 mt-6">Lets check it:</p>
              <Link href={book.url} target='_blank' className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{book.url}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS with the same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Books</h2>

        <Collection
          data={relatedBooks?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Books"
          limit={3}
          page={isNaN(Number(searchParams.page)) ? 1 : Number(searchParams.page)}
          // page={searchParams.page as string}
          totalPages={relatedBooks?.totalPages}
        />
      </section>
    </>
  )
}

export default BookDetails