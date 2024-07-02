import { verify } from "hono/jwt";

// @ts-ignore
export function initMiddleware(app) {
    // @ts-ignore
    app.use('/api/v1/blog/*', async (c, next) => {
        try {
            const header = c.req.header("Authorization");

            if (!header) return c.json({ error: "Unauthorized" })

            const token = header.split(" ")[1]

            const payload = await verify(token, c.env.JWT_SECRET);
            if (!payload) {
                c.status(403);
                return c.json({ error: "Unauthorized" })
            }
            c.set("userId", payload.id);
            await next();

        } catch (e) {
            return c.json({
                error: "Something Went Wrong"
            }, 400)
        }
    })
}