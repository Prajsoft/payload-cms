import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "blog" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "blog_post_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "blog_post" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"blog_id" integer NOT NULL,
  	"visibility" varchar DEFAULT 'draft' NOT NULL,
  	"author" varchar,
  	"published_at" timestamp(3) with time zone,
  	"excerpt" varchar,
  	"featured_image_id" integer,
  	"content" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_open_graph_og_title" varchar,
  	"seo_open_graph_og_description" varchar,
  	"seo_open_graph_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE UNIQUE INDEX IF NOT EXISTS "blog_slug_idx" ON "blog" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "blog_updated_at_idx" ON "blog" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "blog_created_at_idx" ON "blog" USING btree ("created_at");

  CREATE INDEX IF NOT EXISTS "blog_post_tags_order_idx" ON "blog_post_tags" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_post_tags_parent_id_idx" ON "blog_post_tags" USING btree ("_parent_id");

  CREATE INDEX IF NOT EXISTS "blog_post_slug_idx" ON "blog_post" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "blog_post_blog_idx" ON "blog_post" USING btree ("blog_id");
  CREATE INDEX IF NOT EXISTS "blog_post_updated_at_idx" ON "blog_post" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "blog_post_created_at_idx" ON "blog_post" USING btree ("created_at");

  ALTER TABLE "blog_post_tags" ADD CONSTRAINT "blog_post_tags_parent_id_fk"
    FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_post"("id") ON DELETE cascade ON UPDATE no action;

  ALTER TABLE "blog_post" ADD CONSTRAINT "blog_post_blog_id_blog_id_fk"
    FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE set null ON UPDATE no action;

  ALTER TABLE "blog_post" ADD CONSTRAINT "blog_post_featured_image_id_media_id_fk"
    FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

  ALTER TABLE "blog_post" ADD CONSTRAINT "blog_post_seo_open_graph_og_image_id_media_id_fk"
    FOREIGN KEY ("seo_open_graph_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "blog_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "blog_post_id" integer;

  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_fk"
    FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;

  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_post_fk"
    FOREIGN KEY ("blog_post_id") REFERENCES "public"."blog_post"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_blog_id_idx"
    ON "payload_locked_documents_rels" USING btree ("blog_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_blog_post_id_idx"
    ON "payload_locked_documents_rels" USING btree ("blog_post_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "blog_post_tags";
   DROP TABLE IF EXISTS "blog_post";
   DROP TABLE IF EXISTS "blog";
  `)
}
