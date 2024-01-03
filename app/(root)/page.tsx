import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllBooks } from "@/lib/actions/book.actions";
import { SearchParamProps } from "@/types";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText =(searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const books = await getAllBooks({
    query : searchText,
    category,
    page,
    limit: 9
  });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">explore all your curiosities about great books on our platform!</h1>
            <p className="p-regular-20 md:p-regular-24">We all know that books are windows to the world, sources of knowledge, and records of miracles</p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#books">
                Explore Now
              </Link>
            </Button>
          </div>

          <Image 
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[90vh] object-contain object-center 2xl:max-h-[70vh]"
          />
        </div>
      </section> 

      <section id="books" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Search <br /> Your Book Now!</h2>

        <SignedOut>
          <i className="underline">Please log in if you want to post a book</i>
        </SignedOut>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={books?.data}
          emptyTitle="No Books Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Books"
          limit={9}
          page={page}
          totalPages={books?.totalPages}
        />
      </section>
    </>
  )
}
