import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { sign } from 'hono/jwt'
import { Hono } from 'hono'
import { SignUpInput, SigninInput } from '@sameer11/blog-commons'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success, error } = SignUpInput.safeParse(body);

    if (!success) {
        console.log(error);
        return c.json({
            error: "Inputs not Correct"
        }, 400);
    }

    try {
        // TODO: HASH PASSWORD BEFORE STORING IN THE DATABASE

        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password
            }
        })

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.json({
            message: "User Created Successfully",
            token
        }, 200);

    } catch (error) {
        console.log(error); // Log the actual error
        return c.json({
            message: "Something Went Wrong! Please try again Later"
        }, 400);
    }
})

userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success, error } = SigninInput.safeParse(body);

    if (!success) {
        console.log(error);
        return c.json({
            error: "Inputs not Correct"
        }, 400);
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        });

        if (!user) {
            return c.json({
                error: "Unauthorized"
            }, 403);
        }

        // TODO: PASSWORD AND TOKEN VERIFICATION

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.json({
            token
        })

    } catch (error) {
        console.log(error); // Log the actual error
        return c.json({
            message: "Something Went Wrong! Please try again Later"
        }, 400);
    }
})
