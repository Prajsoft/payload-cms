import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "blog_post" DROP COLUMN IF EXISTS "content";

    CREATE TABLE IF NOT EXISTS "blog_post_layout_direct_answer" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar,
      "question" varchar NOT NULL,
      "short_answer" varchar NOT NULL,
      "expanded_answer" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_definition" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar,
      "term" varchar NOT NULL,
      "definition" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_text" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar,
      "content" jsonb
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_image" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar,
      "image_id" integer,
      "alt" varchar,
      "caption" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_video" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar,
      "youtube_url" varchar,
      "caption" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_gallery" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_gallery_images" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer,
      "alt" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_tip" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar,
      "title" varchar,
      "content" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_warning" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar,
      "title" varchar,
      "content" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_comparison_table" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_comparison_table_rows" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "feature" varchar,
      "option_a" varchar,
      "option_b" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_stats" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_stats_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "value" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_pros_cons" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_pros_cons_pros" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "item" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_pros_cons_cons" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "item" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_related_posts" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar,
      "title" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_related_posts_posts" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "slug" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_product_recommendation" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar,
      "product_handle" varchar,
      "title" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_faq" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_faq_questions" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "question" varchar,
      "answer" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_summary" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_summary_points" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "point" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_cta" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar,
      "title" varchar,
      "description" varchar,
      "button_text" varchar,
      "link" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_layout_divider" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar
    );

    CREATE INDEX IF NOT EXISTS "blog_post_layout_direct_answer_order_idx" ON "blog_post_layout_direct_answer" ("_order");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_direct_answer_parent_idx" ON "blog_post_layout_direct_answer" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_definition_order_idx" ON "blog_post_layout_definition" ("_order");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_definition_parent_idx" ON "blog_post_layout_definition" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_text_order_idx" ON "blog_post_layout_text" ("_order");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_text_parent_idx" ON "blog_post_layout_text" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_image_order_idx" ON "blog_post_layout_image" ("_order");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_image_parent_idx" ON "blog_post_layout_image" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_video_order_idx" ON "blog_post_layout_video" ("_order");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_video_parent_idx" ON "blog_post_layout_video" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_gallery_order_idx" ON "blog_post_layout_gallery" ("_order");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_gallery_parent_idx" ON "blog_post_layout_gallery" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_tip_order_idx" ON "blog_post_layout_tip" ("_order");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_tip_parent_idx" ON "blog_post_layout_tip" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_warning_order_idx" ON "blog_post_layout_warning" ("_order");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_warning_parent_idx" ON "blog_post_layout_warning" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_comparison_table_order_idx" ON "blog_post_layout_comparison_table" ("_order");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_comparison_table_parent_idx" ON "blog_post_layout_comparison_table" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_stats_order_idx" ON "blog_post_layout_stats" ("_order");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_stats_parent_idx" ON "blog_post_layout_stats" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_pros_cons_order_idx" ON "blog_post_layout_pros_cons" ("_order");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_pros_cons_parent_idx" ON "blog_post_layout_pros_cons" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_related_posts_order_idx" ON "blog_post_layout_related_posts" ("_order");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_related_posts_parent_idx" ON "blog_post_layout_related_posts" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_product_recommendation_order_idx" ON "blog_post_layout_product_recommendation" ("_order");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_product_recommendation_parent_idx" ON "blog_post_layout_product_recommendation" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_faq_order_idx" ON "blog_post_layout_faq" ("_order");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_faq_parent_idx" ON "blog_post_layout_faq" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_summary_order_idx" ON "blog_post_layout_summary" ("_order");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_summary_parent_idx" ON "blog_post_layout_summary" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_cta_order_idx" ON "blog_post_layout_cta" ("_order");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_cta_parent_idx" ON "blog_post_layout_cta" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_divider_order_idx" ON "blog_post_layout_divider" ("_order");
    CREATE INDEX IF NOT EXISTS "blog_post_layout_divider_parent_idx" ON "blog_post_layout_divider" ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "blog_post_layout_divider";
    DROP TABLE IF EXISTS "blog_post_layout_cta";
    DROP TABLE IF EXISTS "blog_post_layout_summary_points";
    DROP TABLE IF EXISTS "blog_post_layout_summary";
    DROP TABLE IF EXISTS "blog_post_layout_faq_questions";
    DROP TABLE IF EXISTS "blog_post_layout_faq";
    DROP TABLE IF EXISTS "blog_post_layout_product_recommendation";
    DROP TABLE IF EXISTS "blog_post_layout_related_posts_posts";
    DROP TABLE IF EXISTS "blog_post_layout_related_posts";
    DROP TABLE IF EXISTS "blog_post_layout_pros_cons_cons";
    DROP TABLE IF EXISTS "blog_post_layout_pros_cons_pros";
    DROP TABLE IF EXISTS "blog_post_layout_pros_cons";
    DROP TABLE IF EXISTS "blog_post_layout_stats_items";
    DROP TABLE IF EXISTS "blog_post_layout_stats";
    DROP TABLE IF EXISTS "blog_post_layout_comparison_table_rows";
    DROP TABLE IF EXISTS "blog_post_layout_comparison_table";
    DROP TABLE IF EXISTS "blog_post_layout_warning";
    DROP TABLE IF EXISTS "blog_post_layout_tip";
    DROP TABLE IF EXISTS "blog_post_layout_gallery_images";
    DROP TABLE IF EXISTS "blog_post_layout_gallery";
    DROP TABLE IF EXISTS "blog_post_layout_video";
    DROP TABLE IF EXISTS "blog_post_layout_image";
    DROP TABLE IF EXISTS "blog_post_layout_text";
    DROP TABLE IF EXISTS "blog_post_layout_definition";
    DROP TABLE IF EXISTS "blog_post_layout_direct_answer";
    ALTER TABLE "blog_post" ADD COLUMN IF NOT EXISTS "content" jsonb;
  `)
}
