import React, { useEffect } from 'react'
import { IBook } from '@/lib/database/models/book.model';
import { Button } from '../ui/button';

const Checkout = ({ book, userId }: { book: IBook, userId: string }) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const onCheckout = async () => {
    const order = {
      bookTitle: book.title,
      bookId: book._id,
      price: book.price,
      isFree: book.isFree,
      buyerId: userId
    }

  }

  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        {book.isFree ? 'Get Ticket' : 'Buy Ticket'}
      </Button>
    </form>
  )
}

export default Checkout