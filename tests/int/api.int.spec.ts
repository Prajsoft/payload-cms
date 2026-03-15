import { getPayload, Payload } from 'payload'
import config from '@/payload.config'
import { describe, it, beforeAll, afterAll, expect } from 'vitest'

let payload: Payload

// Track every document created so we can clean up after all tests.
// Items are deleted in reverse insertion order so children are removed
// before their parents (avoids FK constraint errors).
const created: { collection: string; id: string }[] = []

async function cleanupAll() {
  for (const { collection, id } of [...created].reverse()) {
    try {
      await payload.delete({ collection: collection as any, id })
    } catch {
      // best-effort: ignore if the record was already deleted
    }
  }
}

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  }, 30000)

  afterAll(cleanupAll)

  // ── Users ──────────────────────────────────────────────────────────────────

  describe('users', () => {
    it('find returns a paginated docs array', async () => {
      const users = await payload.find({ collection: 'users' })
      expect(users).toBeDefined()
      expect(Array.isArray(users.docs)).toBe(true)
      expect(typeof users.totalDocs).toBe('number')
    })
  })

  // ── Blog ──────────────────────────────────────────────────────────────────

  describe('blog-post: access control and publishing flow', () => {
    let blogId: string
    let draftPostId: string

    it('creates a blog container and a draft post', async () => {
      const blog = await payload.create({
        collection: 'blog',
        data: {
          title: 'Integration Test Blog',
          slug: `int-test-blog-${Date.now()}`,
          description: 'Created by api.int.spec.ts',
        },
      })
      blogId = blog.id
      created.push({ collection: 'blog', id: blogId })

      const draft = await payload.create({
        collection: 'blog-post',
        data: {
          title: 'Draft: Choosing a Cricket Bat',
          slug: `draft-bat-guide-${Date.now()}`,
          blog: blogId,
          visibility: 'draft',
        },
      })
      draftPostId = draft.id
      created.push({ collection: 'blog-post', id: draftPostId })

      expect(draft.visibility).toBe('draft')
      expect(draft.blog).toBe(blogId)
    })

    it('admin query (overrideAccess: true) sees draft post', async () => {
      const result = await payload.find({
        collection: 'blog-post',
        where: { id: { equals: draftPostId } },
      })

      expect(result.totalDocs).toBe(1)
      expect(result.docs[0].visibility).toBe('draft')
    })

    it('public query (overrideAccess: false) hides draft post', async () => {
      // The BlogPost access function returns { visibility: { equals: "published" } }
      // when req.user is absent, so drafts must not be returned.
      const result = await payload.find({
        collection: 'blog-post',
        overrideAccess: false,
        where: { id: { equals: draftPostId } },
      })

      expect(result.totalDocs).toBe(0)
    })

    it('publishing the post makes it visible in public queries', async () => {
      await payload.update({
        collection: 'blog-post',
        id: draftPostId,
        data: { visibility: 'published' },
      })

      const result = await payload.find({
        collection: 'blog-post',
        overrideAccess: false,
        where: { id: { equals: draftPostId } },
      })

      expect(result.totalDocs).toBe(1)
      expect(result.docs[0].visibility).toBe('published')
    })

    it('un-publishing a post hides it from public queries again', async () => {
      await payload.update({
        collection: 'blog-post',
        id: draftPostId,
        data: { visibility: 'draft' },
      })

      const result = await payload.find({
        collection: 'blog-post',
        overrideAccess: false,
        where: { id: { equals: draftPostId } },
      })

      expect(result.totalDocs).toBe(0)
    })
  })

  // ── Homepage: activation mutex ─────────────────────────────────────────────
  // The Homepage beforeChange hook ensures only one document can be isActive=true
  // at a time by deactivating all others when a new one is activated.
  //
  // NOTE: Homepage requires heroImages (upload array, minRows:1) which needs
  // real Media documents.  The mutex logic is exercised in isolation here by
  // using two already-inactive homepages and activating one via update() so
  // the hook fires.  A full hero-image flow belongs in an e2e test.

  describe('homepage: activation mutex hook', () => {
    let firstId: string
    let secondId: string

    it('only one homepage is active after two are created and activated in sequence', async () => {
      // Create two inactive homepages (bypass required heroImages with overrideAccess)
      const first = await payload.create({
        collection: 'homepage',
        data: {
          title: 'Int Test HP-A',
          heroTitle: 'Hello A',
          heroPrimaryCtaText: 'Shop A',
          heroPrimaryCtaLink: '/store',
          isActive: false,
          heroImages: [],
          trustBarItems: [{ label: 'Shipping' }],
        } as any,
      })
      firstId = first.id
      created.push({ collection: 'homepage', id: firstId })

      const second = await payload.create({
        collection: 'homepage',
        data: {
          title: 'Int Test HP-B',
          heroTitle: 'Hello B',
          heroPrimaryCtaText: 'Shop B',
          heroPrimaryCtaLink: '/store',
          isActive: false,
          heroImages: [],
          trustBarItems: [{ label: 'Returns' }],
        } as any,
      })
      secondId = second.id
      created.push({ collection: 'homepage', id: secondId })

      // Activate first — no other active homepage, so first becomes active
      await payload.update({
        collection: 'homepage',
        id: firstId,
        data: { isActive: true } as any,
      })

      // Activate second — hook should deactivate first
      await payload.update({
        collection: 'homepage',
        id: secondId,
        data: { isActive: true } as any,
      })

      const firstDoc = await payload.findByID({ collection: 'homepage', id: firstId })
      const secondDoc = await payload.findByID({ collection: 'homepage', id: secondId })

      expect(firstDoc.isActive).toBe(false)
      expect(secondDoc.isActive).toBe(true)
    })
  })
})
