
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, jwt, sign, verify } from 'hono/jwt'
import { SignUpInput,SigninInput } from '@sameer11/blog-commons'
export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    },
    Variables:{
      userId:string
    }
  }>()

//SignUp
userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json()
    const {success} = SignUpInput.safeParse(body)
    if(!success){
      return c.json({error:"Invalid Input"},400)
    }
    try {
      //Check if user exists:
      const ExistingUser = await prisma.user.findUnique({
        where: {
          email: body.email
        }
      })
      if (ExistingUser) {
        return c.json({ error: 'User already exists' })
      }
  
      //Else create a new user
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name,
  
        }
      })
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
      return c.json({ jwt })
    } catch (error) {
      c.status(403);
      return c.json({ error: "error while signing up" });
    }
  })
  
  
  
  //Sign In 
  userRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json()
    const {success} = SigninInput.safeParse(body)
    if(!success){
      return c.json({error:"Invalid Input"},400)
    }

    try {
      const ExistingUser = await prisma.user.findUnique({
        where:{
          email : body.email,
          password:body.password
        }
      })
      if (!ExistingUser) {
        return c.json({ error: 'User does not exist' })
      }
      const jwt = await sign({ id: ExistingUser.id }, c.env.JWT_SECRET);
      return c.json({ jwt });
    } catch (error) {
      c.status(403);
      return c.json({ error: "error while signing in" });
    }
  })