import type { CollectionConfig } from 'payload'

export const Homepage: CollectionConfig = {
  slug: 'homepage',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Homepage',
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
