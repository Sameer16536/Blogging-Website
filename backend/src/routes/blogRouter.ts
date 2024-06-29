import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import type { JWTPayload as HonoJWTPayload } from 'hono/utils/jwt/types'

interface CustomJWTPayload extends HonoJWTPayload {
  id: string
}


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>()

// Middleware
blogRouter.use("/*", async (c, next) => {
    const header = c.req.header("Authorization") || ""
    if (!header) {
        c.status(401)
        return c.json({ error: "unauthorized - no header" })
    }
    const token = header.split(' ')[1]
    try {
        const payload = await verify(token, c.env.JWT_SECRET) as CustomJWTPayload
        if (!payload || !payload.id) {
            c.status(401)
            return c.json({ error: "unauthorized - invalid token" })
        }
        c.set('userId', payload.id)
        await next()
    } catch (error) {
        c.status(401)
        return c.json({ error: "unauthorized - error verifying token"})
    }
})

// Create post
blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const authorId = c.get('userId')
    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        })
        return c.json({ id: post.id })
    } catch (error) {
        c.status(500)
        return c.json({ error: "error creating post"})
    }
})

// Update post
blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    try {
        const post = await prisma.post.update({
            where: { id: body.id },
            data: {
                title: body.title,
                content: body.content,
            }
        })
        return c.json({ id: post.id })
    } catch (error) {
        c.status(500)
        return c.json({ error: "error updating post"})
    }
})


// Get all posts
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const allPosts = await prisma.post.findMany()
        return c.json({ posts: allPosts })
    } catch (error) {
        c.status(500)
        return c.json({ error: "error fetching posts" })
    }
})


// Get post by ID
blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const postId = c.req.param('id')
    try {
        const post = await prisma.post.findUnique({ where: { id: postId } })
        if (!post) {
            c.status(404)
            return c.json({ error: "post not found" })
        }
        return c.json({ post: post })
    } catch (error) {
        c.status(500)
        return c.json({ error: "error fetching post"})
    }
})


export default blogRouter
