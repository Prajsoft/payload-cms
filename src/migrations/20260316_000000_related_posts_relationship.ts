import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "blog_post_blocks_related_posts_posts"
      ADD COLUMN IF NOT EXISTS "post_id" integer;

    ALTER TABLE "blog_post_blocks_related_posts_posts"
      DROP CONSTRAINT IF EXISTS "blog_post_blocks_related_posts_posts_post_id_fk";

    ALTER TABLE "blog_post_blocks_related_posts_posts"
      ADD CONSTRAINT "blog_post_blocks_related_posts_posts_post_id_fk"
      FOREIGN KEY ("post_id") REFERENCES "public"."blog_post"("id")
      ON DELETE set null ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "blog_post_blocks_related_posts_posts_post_id_idx"
      ON "blog_post_blocks_related_posts_posts" USING btree ("post_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "blog_post_blocks_related_posts_posts"
      DROP CONSTRAINT IF EXISTS "blog_post_blocks_related_posts_posts_post_id_fk";

    DROP INDEX IF EXISTS "blog_post_blocks_related_posts_posts_post_id_idx";

    ALTER TABLE "blog_post_blocks_related_posts_posts"
      DROP COLUMN IF EXISTS "post_id";
  `)
}
