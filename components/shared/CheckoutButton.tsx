"use client"

import { IBook } from '@/lib/database/models/book.model'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Checkout from './Checkout'

const CheckoutButton = ({ book }: { book: IBook }) => {
    const { user } = useUser();
    const userId = user?.publicMetadata.userId as string;

    return (
        <div className="flex items-center gap-3">
            <SignedOut>
                <Button asChild className="button rounded-full" size="lg">
                    <Link href="/sign-in">
                        Save Book
                    </Link>
                </Button>
            </SignedOut>

            <SignedIn>
                <Checkout book={book} userId={userId} />
            </SignedIn>
        </div>
    )
}

export default CheckoutButton