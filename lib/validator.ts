import * as z from "zod"

export const bookFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters').max(1000, 'Description must be less than 1000 characters'),
  writer: z.string().min(3, 'Author is required'),
  poster: z.string().min(3, 'This field is required'),
  imageUrl: z.string().min(3, 'Image is required'),
  categoryId: z.string(),
  price: z.string().min(3, 'Price is required'),
  isFree: z.boolean(),
  url: z.string().url()
})