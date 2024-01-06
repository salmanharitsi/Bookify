"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { bookFormSchema } from "@/lib/validator"
import * as z from 'zod'
import { bookDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUploader"
import { useState } from "react"
import Image from "next/image"
import { useUploadThing } from '@/lib/uploadthing'

import { Checkbox } from "../ui/checkbox"
import { useRouter } from "next/navigation"
import { createBook, updateBook } from "@/lib/actions/book.actions"
import { IBook } from "@/lib/database/models/book.model"

type BookFormProps = {
    userId: string
    type: "Create" | "Update"
    book?: IBook,
    bookId?: string
}

const BookForm = ({ userId, type, book, bookId }: BookFormProps) => {
    const [files, setFiles] = useState<File[]>([])
    const initialValues = type === 'Update' ? { ...book } : bookDefaultValues;
    const router = useRouter();

    const { startUpload } = useUploadThing('imageUploader')

    const form = useForm<z.infer<typeof bookFormSchema>>({
        resolver: zodResolver(bookFormSchema),
        defaultValues: initialValues
    })

    async function onSubmit(values: z.infer<typeof bookFormSchema>) {
        let uploadedImageUrl = values.imageUrl;

        if (files.length > 0) {
            const uploadedImages = await startUpload(files)

            if (!uploadedImages) {
                return
            }

            uploadedImageUrl = uploadedImages[0].url
        }

        if (type === 'Create') {
            try {
                const newBook = await createBook({
                    book: { ...values, imageUrl: uploadedImageUrl },
                    userId,
                    path: '/profile'
                })

                if (newBook) {
                    form.reset();
                    router.push(`/books/${newBook._id}`)
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (type === 'Update') {
            if (!bookId) {
                router.back()
                return;
            }

            try {
                const updatedBook = await updateBook({
                    userId,
                    book: { ...values, imageUrl: uploadedImageUrl, _id: bookId },
                    path: `/books/${bookId}`
                })

                if (updatedBook) {
                    form.reset();
                    router.push(`/books/${updatedBook._id}`)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Book title" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Dropdown onChangeHandler={field.onChange} value={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="writer"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Author" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <Textarea placeholder="Description" {...field} className="textarea rounded-2xl" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <FileUploader
                                        onFieldChange={field.onChange}
                                        imageUrl={field.value}
                                        setFiles={setFiles}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <Image
                                            src="/assets/icons/dollar.svg"
                                            alt="dollar"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <Input type="number" placeholder="Price" {...field} className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                        {/* <FormField
                                            control={form.control}
                                            name="isFree"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="flex items-center">
                                                            <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free</label>
                                                            <Checkbox
                                                                onCheckedChange={field.onChange}
                                                                checked={field.value}
                                                                id="isFree" className="mr-2 h-5 w-5 border-2 border-primary-500" />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        /> */}
                                    </div>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <Image
                                            src="/assets/icons/link.svg"
                                            alt="link"
                                            width={24}
                                            height={24}
                                        />

                                        <Input placeholder="Source book URL " {...field} className="input-field" />
                                    </div>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>


                <Button
                    type="submit"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                    className="button col-span-2 w-full"
                >
                    {form.formState.isSubmitting ? (
                        'Submitting...'
                    ) : type === 'Create' ? 'Show of Book' : 'Update Book'}
                </Button>
            </form>
        </Form>
    )
}

export default BookForm