/**
 * Blog CMS smoke tests — publishing workflow and access control
 *
 * Covers:
 *  - Admin can navigate to the blog-post collection
 *  - A draft post is hidden from the public REST API
 *  - Publishing a post via the admin UI makes it appear in the public API
 *  - Un-publishing hides it again
 *
 * Uses the Payload SDK for data setup/teardown so the tests are not
 * coupled to admin UI form submission for seeding.
 */

import { test, expect, Page } from '@playwright/test'
import { getPayload } from 'payload'
import config from '../../src/payload.config.js'
import { login } from '../helpers/login'
import { seedTestUser, cleanupTestUser, testUser } from '../helpers/seedUser'

const CMS_URL = 'http://localhost:3000'

// ── Shared seeded data ──────────────────────────────────────────────────────

let blogId: string
let postId: string
const blogSlug = `e2e-test-blog-${Date.now()}`
const postSlug = `e2e-test-post-${Date.now()}`

async function seedBlogAndDraftPost() {
  const payload = await getPayload({ config })

  const blog = await payload.create({
    collection: 'blog',
    data: {
      title: 'E2E Test Blog',
      slug: blogSlug,
      description: 'Created by blog.e2e.spec.ts',
    },
  })
  blogId = blog.id

  const post = await payload.create({
    collection: 'blog-post',
    data: {
      title: 'E2E Test Post — Cricket Bat Review',
      slug: postSlug,
      blog: blogId,
      visibility: 'draft',
    },
  })
  postId = post.id
}

async function cleanupBlogAndPost() {
  const payload = await getPayload({ config })

  try {
    await payload.delete({ collection: 'blog-post', id: postId })
  } catch {
    // already deleted
  }

  try {
    await payload.delete({ collection: 'blog', id: blogId })
  } catch {
    // already deleted
  }
}

// ── Tests ───────────────────────────────────────────────────────────────────

test.describe('Blog CMS: publishing workflow', () => {
  let page: Page

  test.beforeAll(async ({ browser }) => {
    await seedTestUser()
    await seedBlogAndDraftPost()

    const context = await browser.newContext()
    page = await context.newPage()
    await login({ page, user: testUser })
  })

  test.afterAll(async () => {
    await cleanupBlogAndPost()
    await cleanupTestUser()
  })

  // ── Admin navigation ───────────────────────────────────────────────────────

  test('admin can navigate to blog-post collection', async () => {
    await page.goto(`${CMS_URL}/admin/collections/blog-post`)
    await expect(page).toHaveURL(`${CMS_URL}/admin/collections/blog-post`)

    // List view renders a heading for the collection
    const heading = page.locator('h1', { hasText: /blog.?post/i }).first()
    await expect(heading).toBeVisible({ timeout: 10_000 })
  })

  test('draft post appears in admin collection list', async () => {
    await page.goto(`${CMS_URL}/admin/collections/blog-post`)

    // The seeded post title should appear in the list view
    const postRow = page.locator('text=E2E Test Post — Cricket Bat Review').first()
    await expect(postRow).toBeVisible({ timeout: 10_000 })
  })

  // ── Public API: draft hidden ───────────────────────────────────────────────

  test('draft post is hidden from the public REST API', async ({ request }) => {
    // No auth header → overrideAccess: false → only published posts returned
    const response = await request.get(`${CMS_URL}/api/blog-post`, {
      params: {
        'where[id][equals]': postId,
        depth: '0',
      },
    })

    expect(response.ok()).toBe(true)
    const body = await response.json()
    expect(body.totalDocs).toBe(0)
  })

  // ── Publish via admin UI ───────────────────────────────────────────────────

  test('publishing a post via the admin edit view makes it visible publicly', async ({ request }) => {
    // 1. Navigate to the edit view for the seeded post
    await page.goto(`${CMS_URL}/admin/collections/blog-post/${postId}`)
    await expect(page).toHaveURL(
      new RegExp(`/admin/collections/blog-post/${postId}`),
      { timeout: 10_000 }
    )

    // 2. Change the visibility select from "draft" to "published"
    //    Payload renders select fields with an id of #field-<fieldName>
    const visibilitySelect = page.locator('#field-visibility')
    await expect(visibilitySelect).toBeVisible({ timeout: 10_000 })
    await visibilitySelect.selectOption('published')

    // 3. Save the document — Payload uses a "Save" button in the toolbar
    const saveBtn = page.locator('button', { hasText: /^save$/i }).first()
    await expect(saveBtn).toBeVisible()
    await saveBtn.click()

    // Wait for the save to complete (URL stays on the same edit view)
    await page.waitForURL(new RegExp(`/admin/collections/blog-post/${postId}`), {
      timeout: 10_000,
    })

    // 4. Verify public REST API now returns the post
    const response = await request.get(`${CMS_URL}/api/blog-post`, {
      params: {
        'where[id][equals]': postId,
        depth: '0',
      },
    })

    expect(response.ok()).toBe(true)
    const body = await response.json()
    expect(body.totalDocs).toBe(1)
    expect(body.docs[0].visibility).toBe('published')
  })

  // ── Un-publish via admin UI ────────────────────────────────────────────────

  test('un-publishing a post via the admin edit view hides it publicly again', async ({ request }) => {
    // 1. Navigate to the edit view
    await page.goto(`${CMS_URL}/admin/collections/blog-post/${postId}`)
    await expect(page).toHaveURL(
      new RegExp(`/admin/collections/blog-post/${postId}`),
      { timeout: 10_000 }
    )

    // 2. Change visibility back to draft
    const visibilitySelect = page.locator('#field-visibility')
    await expect(visibilitySelect).toBeVisible({ timeout: 10_000 })
    await visibilitySelect.selectOption('draft')

    // 3. Save
    const saveBtn = page.locator('button', { hasText: /^save$/i }).first()
    await saveBtn.click()

    await page.waitForURL(new RegExp(`/admin/collections/blog-post/${postId}`), {
      timeout: 10_000,
    })

    // 4. Post should no longer appear in public API
    const response = await request.get(`${CMS_URL}/api/blog-post`, {
      params: {
        'where[id][equals]': postId,
        depth: '0',
      },
    })

    expect(response.ok()).toBe(true)
    const body = await response.json()
    expect(body.totalDocs).toBe(0)
  })

  // ── Blog container ─────────────────────────────────────────────────────────

  test('blog container appears in public REST API', async ({ request }) => {
    const response = await request.get(`${CMS_URL}/api/blog`, {
      params: {
        'where[slug][equals]': blogSlug,
        depth: '0',
      },
    })

    expect(response.ok()).toBe(true)
    const body = await response.json()
    expect(body.totalDocs).toBe(1)
    expect(body.docs[0].slug).toBe(blogSlug)
  })
})
