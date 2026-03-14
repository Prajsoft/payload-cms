import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- ToC manual items table
    CREATE TABLE IF NOT EXISTS "blog_post_blocks_table_of_contents_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "anchor" varchar
    );

    -- Unique constraint: one slug per blog (prevents shadowing)
    CREATE UNIQUE INDEX IF NOT EXISTS "blog_post_blog_id_slug_idx"
      ON "blog_post" ("blog_id", "slug");

    -- Indexes on new block nested tables (_parent_id lookups)
    CREATE INDEX IF NOT EXISTS "blog_post_blocks_how_to_steps_steps_parent_idx"
      ON "blog_post_blocks_how_to_steps_steps" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "blog_post_blocks_table_headers_parent_idx"
      ON "blog_post_blocks_table_headers" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "blog_post_blocks_table_rows_parent_idx"
      ON "blog_post_blocks_table_rows" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "blog_post_blocks_table_of_contents_items_parent_idx"
      ON "blog_post_blocks_table_of_contents_items" ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "blog_post_blocks_table_of_contents_items";
    DROP INDEX IF EXISTS "blog_post_blog_id_slug_idx";
    DROP INDEX IF EXISTS "blog_post_blocks_how_to_steps_steps_parent_idx";
    DROP INDEX IF EXISTS "blog_post_blocks_table_headers_parent_idx";
    DROP INDEX IF EXISTS "blog_post_blocks_table_rows_parent_idx";
    DROP INDEX IF EXISTS "blog_post_blocks_table_of_contents_items_parent_idx";
  `)
}
