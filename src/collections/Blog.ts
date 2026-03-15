import type { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blog',
  access: { read: () => true },
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'URL-friendly identifier, e.g. cricket-tips' },
    },
    { name: 'description', type: 'textarea' },
    {
      name: 'backgroundSvg',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Upload an SVG file to use as the repeating background pattern for this blog. Leave empty to use the default cricket pattern.',
      },
    },
  ],
}
