import type { CollectionConfig, Field } from 'payload'

const seoFields: Field[] = [
  {
    name: 'seo',
    type: 'group',
    fields: [
      { name: 'metaTitle', type: 'text' },
      { name: 'metaDescription', type: 'textarea' },
      { name: 'canonicalUrl', type: 'text' },
      { name: 'noIndex', type: 'checkbox', defaultValue: false },
      {
        name: 'openGraph',
        type: 'group',
        fields: [
          { name: 'ogTitle', type: 'text' },
          { name: 'ogDescription', type: 'textarea' },
          { name: 'ogImage', type: 'upload', relationTo: 'media' },
        ],
      },
    ],
  },
]

export const BlogPost: CollectionConfig = {
  slug: 'blog-post',
  access: { read: () => true },
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      index: true,
      admin: { description: 'URL-friendly identifier, e.g. how-to-grip-a-cricket-bat' },
    },
    {
      name: 'blog',
      type: 'relationship',
      relationTo: 'blog',
      required: true,
      index: true,
    },
    {
      name: 'visibility',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
    },
    { name: 'author', type: 'text' },
    { name: 'publishedAt', type: 'date' },
    { name: 'excerpt', type: 'textarea' },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    {
      name: 'content',
      type: 'richText',
    },
    ...seoFields,
  ],
}
