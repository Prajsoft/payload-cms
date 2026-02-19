import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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
  plugins: [],
})
