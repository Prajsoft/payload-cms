import 'dotenv/config'
import pg from 'pg'

const { Client } = pg

const tableRenames = [
  ['blog_post_layout_direct_answer', 'blog_post_blocks_direct_answer'],
  ['blog_post_layout_definition', 'blog_post_blocks_definition'],
  ['blog_post_layout_text', 'blog_post_blocks_text'],
  ['blog_post_layout_image', 'blog_post_blocks_image'],
  ['blog_post_layout_video', 'blog_post_blocks_video'],
  ['blog_post_layout_gallery', 'blog_post_blocks_gallery'],
  ['blog_post_layout_gallery_images', 'blog_post_blocks_gallery_images'],
  ['blog_post_layout_tip', 'blog_post_blocks_tip'],
  ['blog_post_layout_warning', 'blog_post_blocks_warning'],
  ['blog_post_layout_comparison_table', 'blog_post_blocks_comparison_table'],
  ['blog_post_layout_comparison_table_rows', 'blog_post_blocks_comparison_table_rows'],
  ['blog_post_layout_stats', 'blog_post_blocks_stats'],
  ['blog_post_layout_stats_items', 'blog_post_blocks_stats_items'],
  ['blog_post_layout_pros_cons', 'blog_post_blocks_pros_cons'],
  ['blog_post_layout_pros_cons_pros', 'blog_post_blocks_pros_cons_pros'],
  ['blog_post_layout_pros_cons_cons', 'blog_post_blocks_pros_cons_cons'],
  ['blog_post_layout_related_posts', 'blog_post_blocks_related_posts'],
  ['blog_post_layout_related_posts_posts', 'blog_post_blocks_related_posts_posts'],
  ['blog_post_layout_product_recommendation', 'blog_post_blocks_product_recommendation'],
  ['blog_post_layout_faq', 'blog_post_blocks_faq'],
  ['blog_post_layout_faq_questions', 'blog_post_blocks_faq_questions'],
  ['blog_post_layout_summary', 'blog_post_blocks_summary'],
  ['blog_post_layout_summary_points', 'blog_post_blocks_summary_points'],
  ['blog_post_layout_cta', 'blog_post_blocks_cta'],
  ['blog_post_layout_divider', 'blog_post_blocks_divider'],
]

const topLevelBlockTables = [
  'direct_answer',
  'definition',
  'text',
  'image',
  'video',
  'gallery',
  'tip',
  'warning',
  'comparison_table',
  'stats',
  'pros_cons',
  'related_posts',
  'product_recommendation',
  'faq',
  'summary',
  'cta',
  'divider',
]

async function relationExists(client, relationName) {
  const result = await client.query('select to_regclass($1) as relation_name', [
    `public.${relationName}`,
  ])

  return Boolean(result.rows[0]?.relation_name)
}

async function renameIfNeeded(client, oldName, newName, kind) {
  const oldExists = await relationExists(client, oldName)
  const newExists = await relationExists(client, newName)

  if (oldExists && !newExists) {
    await client.query(`ALTER ${kind} "${oldName}" RENAME TO "${newName}"`)
    return 'renamed'
  }

  if (oldExists && newExists) {
    return 'conflict'
  }

  if (newExists) {
    return 'already_ok'
  }

  return 'missing'
}

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })

  await client.connect()

  const summary = {
    tables: {},
    indexes: {},
  }

  for (const [oldTable, newTable] of tableRenames) {
    summary.tables[`${oldTable}->${newTable}`] = await renameIfNeeded(
      client,
      oldTable,
      newTable,
      'TABLE'
    )
  }

  for (const suffix of topLevelBlockTables) {
    await client.query(
      `ALTER TABLE "blog_post_blocks_${suffix}" ADD COLUMN IF NOT EXISTS "_path" varchar`
    )

    for (const [oldIndex, newIndex] of [
      [
        `blog_post_layout_${suffix}_order_idx`,
        `blog_post_blocks_${suffix}_order_idx`,
      ],
      [
        `blog_post_layout_${suffix}_parent_idx`,
        `blog_post_blocks_${suffix}_parent_idx`,
      ],
    ]) {
      summary.indexes[`${oldIndex}->${newIndex}`] = await renameIfNeeded(
        client,
        oldIndex,
        newIndex,
        'INDEX'
      )
    }
  }

  await client.end()

  console.log(JSON.stringify(summary, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
