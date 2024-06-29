import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'



const app = new Hono<{
  Bindings:{
    DATABASE_URL : string
  }
}>()

app.post('/api/v1/signup', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = await c.req.json()
  
  //Check if user exists:
  const user = await prisma.user.findUnique({
    where:{
      email:body.email
    }
  })
  if(user){
    return c.json({error:'User already exists'})
  }

//Else create a new user
  await prisma.user.create({
    data:{
      email:body.email,
      password:body.password,
      name:body.name,

    }
  })

  return c.text('Hello Hono!')
})

app.post('/api/v1/signin', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.patch('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})
app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})
app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Hello Hono!')
})
export default app
