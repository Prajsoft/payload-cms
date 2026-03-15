import type { Block } from 'payload'

export const DirectAnswer: Block = {
  slug: 'directAnswer',
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'shortAnswer', type: 'textarea', required: true },
    { name: 'expandedAnswer', type: 'textarea' },
  ],
}

export const Definition: Block = {
  slug: 'definition',
  fields: [
    { name: 'term', type: 'text', required: true },
    { name: 'definition', type: 'textarea', required: true },
  ],
}

export const TextBlock: Block = {
  slug: 'text',
  fields: [
    { name: 'content', type: 'richText' },
  ],
}

export const ImageBlock: Block = {
  slug: 'image',
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'alt', type: 'text' },
    { name: 'caption', type: 'text' },
  ],
}

export const VideoBlock: Block = {
  slug: 'video',
  fields: [
    { name: 'youtubeUrl', type: 'text' },
    { name: 'caption', type: 'text' },
  ],
}

export const GalleryBlock: Block = {
  slug: 'gallery',
  fields: [
    {
      name: 'images',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'alt', type: 'text' },
      ],
    },
  ],
}

export const TipBlock: Block = {
  slug: 'tip',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'content', type: 'textarea', required: true },
  ],
}

export const WarningBlock: Block = {
  slug: 'warning',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'content', type: 'textarea', required: true },
  ],
}

export const ComparisonTable: Block = {
  slug: 'comparisonTable',
  fields: [
    {
      name: 'rows',
      type: 'array',
      fields: [
        { name: 'feature', type: 'text' },
        { name: 'optionA', type: 'text' },
        { name: 'optionB', type: 'text' },
      ],
    },
  ],
}

export const StatsBlock: Block = {
  slug: 'stats',
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'value', type: 'text' },
      ],
    },
  ],
}

export const ProsConsBlock: Block = {
  slug: 'prosCons',
  fields: [
    {
      name: 'pros',
      type: 'array',
      fields: [
        { name: 'item', type: 'text' },
      ],
    },
    {
      name: 'cons',
      type: 'array',
      fields: [
        { name: 'item', type: 'text' },
      ],
    },
  ],
}

export const RelatedPostsBlock: Block = {
  slug: 'relatedPosts',
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'posts',
      type: 'array',
      fields: [
        {
          name: 'post',
          type: 'relationship',
          relationTo: 'blog-post',
          admin: {
            description: 'Select a related blog post for a correct storefront link.',
          },
        },
        {
          name: 'slug',
          type: 'text',
          admin: {
            description: 'Legacy fallback. Use only when a related post record is not available.',
            condition: (
              _data: unknown,
              siblingData: {
                post?: unknown
              } | undefined
            ) => !siblingData?.post,
          },
        },
      ],
    },
  ],
}

export const ProductRecommendation: Block = {
  slug: 'productRecommendation',
  fields: [
    {
      name: 'productHandle',
      type: 'text',
      admin: { description: 'Medusa product handle' },
    },
    { name: 'title', type: 'text' },
  ],
}

export const FAQBlock: Block = {
  slug: 'faq',
  fields: [
    {
      name: 'questions',
      type: 'array',
      fields: [
        { name: 'question', type: 'text' },
        { name: 'answer', type: 'textarea' },
      ],
    },
  ],
}

export const SummaryBlock: Block = {
  slug: 'summary',
  fields: [
    {
      name: 'points',
      type: 'array',
      fields: [
        { name: 'point', type: 'text' },
      ],
    },
  ],
}

export const CTA: Block = {
  slug: 'cta',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'buttonText', type: 'text' },
    { name: 'link', type: 'text' },
  ],
}

export const Divider: Block = {
  slug: 'divider',
  fields: [],
}

export const HeroImageBlock: Block = {
  slug: 'heroImage',
  labels: { singular: 'Hero Image', plural: 'Hero Images' },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'alt',
      type: 'text',
      admin: { description: 'Alt text for screen readers and SEO. Defaults to image filename if blank.' },
    },
    {
      name: 'caption',
      type: 'text',
      admin: { description: 'Optional caption shown below the image.' },
    },
    {
      name: 'height',
      type: 'select',
      defaultValue: 'md',
      options: [
        { label: 'Small (300px)', value: 'sm' },
        { label: 'Medium (480px)', value: 'md' },
        { label: 'Large (640px)', value: 'lg' },
        { label: 'Full viewport height', value: 'full' },
      ],
      admin: { description: 'Controls the rendered height of the hero image.' },
    },
    {
      name: 'objectPosition',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Top', value: 'top' },
        { label: 'Center', value: 'center' },
        { label: 'Bottom', value: 'bottom' },
      ],
      admin: { description: 'Focal point when the image is cropped to fit.' },
    },
    {
      name: 'overlay',
      type: 'group',
      admin: { description: 'Optional dark overlay with text on top of the image.' },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'opacity',
          type: 'number',
          defaultValue: 40,
          min: 0,
          max: 100,
          admin: {
            description: 'Overlay darkness 0–100 (40 = 40% black).',
            condition: (_, siblingData) => !!siblingData?.enabled,
          },
        },
        {
          name: 'headline',
          type: 'text',
          admin: {
            description: 'Large text centred over the image.',
            condition: (_, siblingData) => !!siblingData?.enabled,
          },
        },
        {
          name: 'subheadline',
          type: 'text',
          admin: {
            description: 'Smaller text beneath the headline.',
            condition: (_, siblingData) => !!siblingData?.enabled,
          },
        },
      ],
    },
  ],
}

export const TableOfContents: Block = {
  slug: 'tableOfContents',
  fields: [
    { name: 'title', type: 'text', defaultValue: 'In this article' },
    { name: 'autoGenerate', type: 'checkbox', defaultValue: true },
    {
      name: 'items',
      type: 'array',
      admin: {
        description: 'Manual items — only used when Auto Generate is off',
        condition: (_, siblingData) => siblingData?.autoGenerate === false,
      },
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'anchor',
          type: 'text',
          admin: { description: 'Heading ID to scroll to (without #), e.g. types-of-cricket-balls' },
        },
      ],
    },
  ],
}

export const HowToSteps: Block = {
  slug: 'howToSteps',
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'stepTitle', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}

export const TableBlock: Block = {
  slug: 'table',
  fields: [
    { name: 'caption', type: 'text' },
    {
      name: 'headers',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      fields: [
        {
          name: 'cells',
          type: 'text',
          admin: { description: 'Pipe-separated values, one per column header (e.g. Men\'s | 156g | Professional)' },
        },
      ],
    },
  ],
}
