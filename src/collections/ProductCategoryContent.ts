import type { CollectionConfig } from 'payload'

export const ProductCategoryContent: CollectionConfig = {
  slug: 'product-category-content',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'internalName',
  },
  fields: [
    {
      name: 'handle',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'internalName',
      type: 'text',
    },
    {
      name: 'shortDescription',
      type: 'text',
      maxLength: 120,
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
