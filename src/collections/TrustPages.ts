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

const sharedAccess = {
  read: () => true,
}

export const AboutPage: CollectionConfig = {
  slug: 'about-page',
  access: sharedAccess,
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true, defaultValue: 'About SVB Sports' },
    { name: 'intro', type: 'textarea' },
    { name: 'content', type: 'richText' },
    ...seoFields,
  ],
}

export const ContactPage: CollectionConfig = {
  slug: 'contact-page',
  access: sharedAccess,
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true, defaultValue: 'Contact Us' },
    { name: 'intro', type: 'textarea' },
    { name: 'email', type: 'text' },
    { name: 'phone', type: 'text' },
    { name: 'location', type: 'text' },
    ...seoFields,
  ],
}

export const FaqPage: CollectionConfig = {
  slug: 'faq-page',
  access: sharedAccess,
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true, defaultValue: 'Frequently Asked Questions' },
    { name: 'intro', type: 'textarea' },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    ...seoFields,
  ],
}

export const ShippingReturnsPage: CollectionConfig = {
  slug: 'shipping-returns-page',
  access: sharedAccess,
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true, defaultValue: 'Shipping & Returns' },
    { name: 'shippingTitle', type: 'text', defaultValue: 'Shipping' },
    { name: 'shippingContent', type: 'richText' },
    { name: 'returnsTitle', type: 'text', defaultValue: 'Returns' },
    { name: 'returnsContent', type: 'richText' },
    ...seoFields,
  ],
}

export const PrivacyPage: CollectionConfig = {
  slug: 'privacy-page',
  access: sharedAccess,
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true, defaultValue: 'Privacy Policy' },
    { name: 'lastUpdated', type: 'date' },
    {
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'content', type: 'richText' },
      ],
    },
    ...seoFields,
  ],
}

export const TermsPage: CollectionConfig = {
  slug: 'terms-page',
  access: sharedAccess,
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true, defaultValue: 'Terms & Conditions' },
    { name: 'lastUpdated', type: 'date' },
    {
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'content', type: 'richText' },
      ],
    },
    ...seoFields,
  ],
}
