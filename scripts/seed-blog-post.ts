import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../src/payload.config'

const SAMPLE_BLOG = {
  title: 'Information',
  slug: 'information',
  description: 'Helpful articles and guides from SVB Sports.',
}

const SAMPLE_POST = {
  title: 'Welcome to the SVB Sports Blog',
  slug: 'welcome-to-svb-sports-blog',
  author: 'SVB Sports',
  excerpt: 'A sample post to verify that blog posts appear correctly in the Payload admin.',
}

async function ensureBlog() {
  const payload = await getPayload({ config })
  const existing = await payload.find({
    collection: 'blog',
    limit: 1,
    where: {
      slug: {
        equals: SAMPLE_BLOG.slug,
      },
    },
  })

  const blog = existing.docs[0]

  if (blog) {
    return { payload, blog, created: false }
  }

  const created = await payload.create({
    collection: 'blog',
    data: SAMPLE_BLOG,
  })

  return { payload, blog: created, created: true }
}

async function ensureBlogPost() {
  const { payload, blog, created: createdBlog } = await ensureBlog()

  const existing = await payload.find({
    collection: 'blog-post',
    limit: 1,
    where: {
      slug: {
        equals: SAMPLE_POST.slug,
      },
    },
  })

  const existingPost = existing.docs[0]

  if (existingPost) {
    return {
      createdBlog,
      createdPost: false,
      blog,
      post: existingPost,
    }
  }

  const createdPost = await payload.create({
    collection: 'blog-post',
    data: {
      ...SAMPLE_POST,
      blog: blog.id,
      visibility: 'published',
      publishedAt: new Date().toISOString(),
      layout: [
        {
          blockType: 'tip',
          title: 'Seeded Sample',
          content: 'This post was created to verify that blog posts appear in the Payload admin.',
        },
        {
          blockType: 'summary',
          points: [
            {
              point: 'The blog-post collection is active.',
            },
            {
              point: 'The admin should now show at least one post.',
            },
          ],
        },
      ],
    },
  })

  return {
    createdBlog,
    createdPost: true,
    blog,
    post: createdPost,
  }
}

ensureBlogPost()
  .then(({ createdBlog, createdPost, blog, post }) => {
    console.log(
      JSON.stringify(
        {
          ok: true,
          createdBlog,
          createdPost,
          blog: {
            id: blog.id,
            title: blog.title,
            slug: blog.slug,
          },
          post: {
            id: post.id,
            title: post.title,
            slug: post.slug,
            visibility: post.visibility,
          },
        },
        null,
        2
      )
    )
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
