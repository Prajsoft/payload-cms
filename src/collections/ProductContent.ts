import type { CollectionConfig } from 'payload'

export const ProductContent: CollectionConfig = {
  slug: 'product-content',
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
      type: 'textarea',
    },
    {
      name: 'keySpecs',
      type: 'array',
      maxRows: 8,
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'value',
          type: 'text',
        },
      ],
    },
    {
      name: 'careNotes',
      type: 'textarea',
    },
    {
      name: 'sizeGuide',
      type: 'textarea',
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
