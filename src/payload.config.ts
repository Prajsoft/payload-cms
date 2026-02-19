import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Homepage } from './collections/Homepage'
import { ProductContent } from './collections/ProductContent'
import { ProductCategoryContent } from './collections/ProductCategoryContent'
import {
  AboutPage,
  ContactPage,
  FaqPage,
  PrivacyPage,
  ShippingReturnsPage,
  TermsPage,
} from './collections/TrustPages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const hasR2StorageConfig = Boolean(
  process.env.R2_BUCKET &&
    process.env.R2_ENDPOINT &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY,
)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Homepage,
    ProductContent,
    ProductCategoryContent,
    AboutPage,
    ContactPage,
    FaqPage,
    ShippingReturnsPage,
    PrivacyPage,
    TermsPage,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: hasR2StorageConfig
    ? [
        s3Storage({
          collections: {
            media: true,
          },
          bucket: process.env.R2_BUCKET || '',
          config: {
            endpoint: process.env.R2_ENDPOINT || '',
            region: process.env.R2_REGION || 'auto',
            forcePathStyle: true,
            credentials: {
              accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
              secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
            },
          },
        }),
      ]
    : [],
})
