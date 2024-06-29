import z from 'zod'

export const SignUpInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name:z.string()

})

export type SignUpInput = z.infer<typeof SignUpInput>


export const SigninInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name:z.string()

})

export type SigninInput = z.infer<typeof SigninInput>

export const createPost = z.object({
    title: z.string(),
    content:z.string()
})
export type createPost = z.infer<typeof createPost> 


export const UpdatePost = z.object({
    title: z.string(),
    content:z.string(),
    id:z.string()
})
export type UpdatePost = z.infer<typeof UpdatePost> 