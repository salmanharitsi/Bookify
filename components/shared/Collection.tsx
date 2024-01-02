import { IBook } from '@/lib/database/models/book.model'
import React from 'react'
import Card from './Card'

type CollectionProps = {
    data: IBook[],
    emptyTitle: string,
    emptyStateSubtext: String,
    limit: number,
    page: number | string,
    totalPages?: number,
    urlParamName?: string,
    collectionType?: 'My_Tickets' | 'All_Books'
}

const Collection = ({
    data,
    emptyTitle,
    emptyStateSubtext,
    page,
    totalPages = 0,
    collectionType,
    urlParamName,
}: CollectionProps) => {
    return (
        <>
            {data.length > 1 ? (
                <div className='flex flex-col items-center gap-10'>
                    <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10'>
                        {data.map((book) => {
                            const hidePrice = collectionType === 'My_Tickets'

                            return(
                                <li key={book._id} className='flelx justify-center'>
                                    <Card book={book} hidePrice={hidePrice} />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            ) : (
                <div className='flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center'>
                    <h3 className='p-bold-20 md:h5-bold'>{emptyTitle}</h3>
                    <p className='p-regular-14'>{emptyStateSubtext}</p>
                </div>
            )}
        </>
    )
}

export default Collection