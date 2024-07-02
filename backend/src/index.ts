import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, jwt, sign, verify } from 'hono/jwt'
import { userRouter } from './routes/userRouter'
import { blogRouter } from './routes/blogRouter'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables:{
    userId:string
  }
}>()
app.use('*', cors());
app.route('/api/v1/blog',blogRouter)
app.route('/api/v1/user',userRouter)


// //Middleware:
// app.use('/api/v1/blog/*', async (c, next) => {
//   //get the header
//   //Verify the header
//   // if header is correct then next() else 403 error
//   const header = c.req.header("Authorization")
//   if(!header){
//     c.status(401);
// 		return c.json({ error: "unauthorized" });
//   }
//   const token  = header.split(' ')[1];
//   const payload =await  verify(token,c.env.JWT_SECRET)
//   if(!payload ){
//     c.status(401);
// 		return c.json({ error: "unauthorized" });
//   }
//   // @ts-ignore
//   c.set('userId', payload.id);
//   await next()
// })







export default app
