import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getBooksByUser } from '@/lib/actions/book.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const ordersPage = Number(searchParams?.ordersPage) || 1;
    const booksPage = Number(searchParams?.booksPage) || 1;

    const orders = await getOrdersByUser({ userId, page: ordersPage })

    const orderedEvents = orders?.data.map((order: IOrder) => order.book) || [];
    const postedBooks = await getBooksByUser({ userId, page: booksPage })

    return (
        <>
            {/* My Like Library */}
            {/* <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between">
                    <h3 className='h3-bold text-center sm:text-left'>Saved Book</h3>
                    <Button asChild size="lg" className="button hidden sm:flex">
                        <Link href="/#books">
                            Explore More Books
                        </Link>
                    </Button>
                </div>
            </section> */}

            {/* <section className="wrapper my-8">
        <Collection 
          data={orderedEvents}
          emptyTitle="No books saved yet"
          emptyStateSubtext="Get started - plenty of exciting books to explore!"
          collectionType="My_Tickets"
          limit={6}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section> */}

            {/* Book Writer */}
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between">
                    <h3 className='h3-bold text-center sm:text-left'>Books Posted</h3>
                    <Button asChild size="lg" className="button hidden sm:flex">
                        <Link href="/books/create">
                            Post More Book
                        </Link>
                    </Button>
                </div>
            </section>

            <section className="wrapper my-8">
                <Collection
                    data={postedBooks?.data}
                    emptyTitle="No books have been posted yet"
                    emptyStateSubtext="Go posted some now"
                    collectionType='Books_Organized'
                    limit={6}
                    page={booksPage}
                    urlParamName="booksPage"
                    totalPages={postedBooks?.totalPages}
                />
            </section>
        </>
    )
}

export default ProfilePage