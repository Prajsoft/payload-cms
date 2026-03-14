import type { CollectionConfig } from 'payload'

export const Homepage: CollectionConfig = {
  slug: 'homepage',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    description: 'Create one homepage per variant (Default, Diwali, Holi…). Tick "Active" on the one you want live — the others are automatically deactivated.',
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // When activating a homepage, deactivate all others first
        if (data.isActive) {
          const existing = await req.payload.find({
            collection: 'homepage',
            where: { isActive: { equals: true } },
            limit: 100,
            depth: 0,
          })
          for (const doc of existing.docs) {
            await req.payload.update({
              collection: 'homepage',
              id: doc.id,
              data: { isActive: false },
              req,
            })
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Homepage',
      admin: { description: 'Label for this variant, e.g. "Default", "Diwali 2026"' },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Tick to make this the live homepage. Only one can be active at a time.',
        position: 'sidebar',
      },
    },
    {
      name: 'announcementBar',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'message',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
        },
        {
          name: 'linkLabel',
          type: 'text',
        },
        {
          name: 'backgroundColor',
          type: 'text',
        },
        {
          name: 'textColor',
          type: 'text',
        },
      ],
    },
    {
      name: 'heroTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
    },
    {
      name: 'heroImages',
      type: 'array',
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'heroPrimaryCtaText',
      type: 'text',
      required: true,
    },
    {
      name: 'heroPrimaryCtaLink',
      type: 'text',
      required: true,
    },
    {
      name: 'heroSecondaryCtaText',
      type: 'text',
    },
    {
      name: 'heroSecondaryCtaLink',
      type: 'text',
    },
    {
      name: 'trustBarEnabled',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'trustBarItems',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'subLabel',
          type: 'text',
        },
      ],
    },
    {
      name: 'shopByCategory',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Shop by Category',
        },
        {
          name: 'categories',
          type: 'array',
          fields: [
            {
              name: 'categoryHandle',
              type: 'text',
              required: true,
            },
            {
              name: 'customTitle',
              type: 'text',
            },
            {
              name: 'customImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'hidden',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'productSections',
      type: 'array',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
        },
        {
          name: 'products',
          type: 'array',
          minRows: 1,
          maxRows: 4,
          fields: [
            {
              name: 'handle',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'ctaLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'ctaLink',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
        },
        {
          name: 'canonicalUrl',
          type: 'text',
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'openGraph',
          type: 'group',
          fields: [
            {
              name: 'ogTitle',
              type: 'text',
            },
            {
              name: 'ogDescription',
              type: 'textarea',
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}
