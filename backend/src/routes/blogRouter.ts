import { Hono } from "hono";
import { cors } from "hono/cors";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { UpdatePost, createPost } from "@sameer11/blog-commons"
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use("*", async (c, next) => {
    try {
        const header = c.req.header("Authorization");

        if (!header) return c.json({ error: "Unauthorized" }, 401)

        const token = header.split(" ")[1]

        const payload = await verify(token, c.env.JWT_SECRET);
        console.log(payload)
        if (!payload) {
            return c.json({ 
                error: "Unauthorized"
            }, 403)
        }
        // Casting payload.id to a string
        c.set("userId", String(payload.id));
        await next();
    } catch (e) {
        return c.json({
            err: "Invalid Request"
        }, 400)
    }
})

blogRouter.post("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = Number(c.get("userId"));

    const body = await c.req.json();
    const { success } = createPost.safeParse(body);

    if (!success) {
        return c.json({
            error: "Inputs not Correct"
        }, 400)
    }

    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })

        return c.json({
            success: "Post Created",
            id: post.id
        });

    } catch (e) {
        console.log(e)
        return c.json({
            err: "Something Went Wrong",
            e
        }, 400)
    }

});

blogRouter.put("/update", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = Number(c.get("userId"));

    const body = await c.req.json();

    const { success } = UpdatePost.safeParse(body);

    if (!success) {
        return c.json({
            error: "Inputs not Correct"
        }, 400)
    }

    try {
        const post = await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId,
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })

        return c.json({
            success: "Post Updated",
            post
        });
    } catch (error) {
        return c.json({
            error: "Something went wrong"
        })
    }

})

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const allPosts = await prisma.post.findMany({
            take: 10,
            select: {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return c.json({
            allPosts
        })

    } catch (error) {
        return c.json({
            error: "Something went wrong"
        }, 400)
    }
})

blogRouter.get("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = Number(c.req.param("id"));
    console.log(id)

    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            },
            select: {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return c.json({
            post
        })

    } catch (error) {
        return c.json({
            error: "Something went wrong"
        }, 400)
    }

})
