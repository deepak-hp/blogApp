import { createBlogInput, updateBlogInput } from "@deepakhp/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string
  }
}>();

// auth middleware
blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
  if (user) {
    c.set("userId", user.id)
    await next();
  } else {
    c.status(403);
    return c.json({
      message: "You are not logged in",
    });
  }
  } catch (error) {
    c.status(403);
    return c.json({
      message: "You are not logged in",
    });
  }
  next();
});

// POST /api/v1/blog
blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const {success} = createBlogInput.safeParse(body);
  
  if(!success){
    c.status(411);
    return c.json({
      message: "inputs not correct"
    })
  }
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });
  if (!post) {
    c.status(411);
    return c.text("unauthorized");
  }
  c.status(200);
  return c.json({ id: post.id });
});

// PUT /api/v1/blog
blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const {success} = updateBlogInput.safeParse(body);
  
  if(!success){
    c.status(411);
    return c.json({
      message: "inputs not correct"
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const post = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      content: body.content,
      title: body.title,
    },
  });
  if (!post) {
    c.status(411);
    return c.text("unauthorized");
  }
  c.status(200);
  return c.json({ id: post.id });
});

// GET /api/v1/blog/bulk
blogRouter.get("/bulk", async (c) => {
  //TODO: pagination
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const posts = await prisma.post.findMany();

  return c.json(posts);
});

// GET /api/v1/blog/:id
blogRouter.get("/:id", async (c) => {
  const { id } = c.req.param();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.post.findFirst({
      where: {
        id,
      },
    });
    if (!blog) {
      c.status(404);
      return c.json({
        message: "Post not found",
      });
    }
    return c.json(blog);
  } catch (error) {
    c.status(411);
    return c.json({
      message: "Error while fetching post",
    });
  }
});
