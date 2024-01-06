import BookForm from "@/components/shared/BookForm"
import { getBookById } from "@/lib/actions/book.actions"
import { auth } from "@clerk/nextjs";

type UpdateBookProps = {
  params: {
    id: string
  }
}

const UpdateBook = async ({ params: { id } }: UpdateBookProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const book = await getBookById(id)

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Book</h3>
      </section>

      <div className="wrapper my-8">
        <BookForm
          type="Update" 
          book={book} 
          bookId={book._id} 
          userId={userId} 
        />
      </div>
    </>
  )
}

export default UpdateBook