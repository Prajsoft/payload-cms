import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "homepage_hero_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_trust_bar_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"sub_label" varchar
  );
  
  CREATE TABLE "homepage_shop_by_category_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category_handle" varchar NOT NULL,
  	"custom_title" varchar,
  	"custom_image_id" integer,
  	"hidden" boolean DEFAULT false
  );
  
  CREATE TABLE "homepage_product_sections_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"handle" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_product_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"cta_label" varchar NOT NULL,
  	"cta_link" varchar NOT NULL
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Homepage' NOT NULL,
  	"announcement_bar_enabled" boolean DEFAULT false,
  	"announcement_bar_message" varchar,
  	"announcement_bar_link" varchar,
  	"announcement_bar_link_label" varchar,
  	"announcement_bar_background_color" varchar,
  	"announcement_bar_text_color" varchar,
  	"hero_title" varchar NOT NULL,
  	"hero_subtitle" varchar,
  	"hero_primary_cta_text" varchar NOT NULL,
  	"hero_primary_cta_link" varchar NOT NULL,
  	"hero_secondary_cta_text" varchar,
  	"hero_secondary_cta_link" varchar,
  	"trust_bar_enabled" boolean DEFAULT true,
  	"shop_by_category_enabled" boolean DEFAULT true,
  	"shop_by_category_title" varchar DEFAULT 'Shop by Category',
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
  
  CREATE TABLE "product_content_key_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "product_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"handle" varchar NOT NULL,
  	"internal_name" varchar,
  	"short_description" varchar,
  	"care_notes" varchar,
  	"size_guide" varchar,
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
  
  CREATE TABLE "product_category_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"handle" varchar NOT NULL,
  	"internal_name" varchar,
  	"short_description" varchar,
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
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "homepage_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "product_content_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "product_category_content_id" integer;
  ALTER TABLE "homepage_hero_images" ADD CONSTRAINT "homepage_hero_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_hero_images" ADD CONSTRAINT "homepage_hero_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_trust_bar_items" ADD CONSTRAINT "homepage_trust_bar_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_shop_by_category_categories" ADD CONSTRAINT "homepage_shop_by_category_categories_custom_image_id_media_id_fk" FOREIGN KEY ("custom_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_shop_by_category_categories" ADD CONSTRAINT "homepage_shop_by_category_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_product_sections_products" ADD CONSTRAINT "homepage_product_sections_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_product_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_product_sections" ADD CONSTRAINT "homepage_product_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_seo_open_graph_og_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_content_key_specs" ADD CONSTRAINT "product_content_key_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_content" ADD CONSTRAINT "product_content_seo_open_graph_og_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_category_content" ADD CONSTRAINT "product_category_content_seo_open_graph_og_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "homepage_hero_images_order_idx" ON "homepage_hero_images" USING btree ("_order");
  CREATE INDEX "homepage_hero_images_parent_id_idx" ON "homepage_hero_images" USING btree ("_parent_id");
  CREATE INDEX "homepage_hero_images_image_idx" ON "homepage_hero_images" USING btree ("image_id");
  CREATE INDEX "homepage_trust_bar_items_order_idx" ON "homepage_trust_bar_items" USING btree ("_order");
  CREATE INDEX "homepage_trust_bar_items_parent_id_idx" ON "homepage_trust_bar_items" USING btree ("_parent_id");
  CREATE INDEX "homepage_shop_by_category_categories_order_idx" ON "homepage_shop_by_category_categories" USING btree ("_order");
  CREATE INDEX "homepage_shop_by_category_categories_parent_id_idx" ON "homepage_shop_by_category_categories" USING btree ("_parent_id");
  CREATE INDEX "homepage_shop_by_category_categories_custom_image_idx" ON "homepage_shop_by_category_categories" USING btree ("custom_image_id");
  CREATE INDEX "homepage_product_sections_products_order_idx" ON "homepage_product_sections_products" USING btree ("_order");
  CREATE INDEX "homepage_product_sections_products_parent_id_idx" ON "homepage_product_sections_products" USING btree ("_parent_id");
  CREATE INDEX "homepage_product_sections_order_idx" ON "homepage_product_sections" USING btree ("_order");
  CREATE INDEX "homepage_product_sections_parent_id_idx" ON "homepage_product_sections" USING btree ("_parent_id");
  CREATE INDEX "homepage_seo_open_graph_seo_open_graph_og_image_idx" ON "homepage" USING btree ("seo_open_graph_og_image_id");
  CREATE INDEX "homepage_updated_at_idx" ON "homepage" USING btree ("updated_at");
  CREATE INDEX "homepage_created_at_idx" ON "homepage" USING btree ("created_at");
  CREATE INDEX "product_content_key_specs_order_idx" ON "product_content_key_specs" USING btree ("_order");
  CREATE INDEX "product_content_key_specs_parent_id_idx" ON "product_content_key_specs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "product_content_handle_idx" ON "product_content" USING btree ("handle");
  CREATE INDEX "product_content_seo_open_graph_seo_open_graph_og_image_idx" ON "product_content" USING btree ("seo_open_graph_og_image_id");
  CREATE INDEX "product_content_updated_at_idx" ON "product_content" USING btree ("updated_at");
  CREATE INDEX "product_content_created_at_idx" ON "product_content" USING btree ("created_at");
  CREATE UNIQUE INDEX "product_category_content_handle_idx" ON "product_category_content" USING btree ("handle");
  CREATE INDEX "product_category_content_seo_open_graph_seo_open_graph_o_idx" ON "product_category_content" USING btree ("seo_open_graph_og_image_id");
  CREATE INDEX "product_category_content_updated_at_idx" ON "product_category_content" USING btree ("updated_at");
  CREATE INDEX "product_category_content_created_at_idx" ON "product_category_content" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_homepage_fk" FOREIGN KEY ("homepage_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_content_fk" FOREIGN KEY ("product_content_id") REFERENCES "public"."product_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_category_content_fk" FOREIGN KEY ("product_category_content_id") REFERENCES "public"."product_category_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_homepage_id_idx" ON "payload_locked_documents_rels" USING btree ("homepage_id");
  CREATE INDEX "payload_locked_documents_rels_product_content_id_idx" ON "payload_locked_documents_rels" USING btree ("product_content_id");
  CREATE INDEX "payload_locked_documents_rels_product_category_content_i_idx" ON "payload_locked_documents_rels" USING btree ("product_category_content_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage_hero_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_trust_bar_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_shop_by_category_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_product_sections_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_product_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_content_key_specs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_category_content" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "homepage_hero_images" CASCADE;
  DROP TABLE "homepage_trust_bar_items" CASCADE;
  DROP TABLE "homepage_shop_by_category_categories" CASCADE;
  DROP TABLE "homepage_product_sections_products" CASCADE;
  DROP TABLE "homepage_product_sections" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "product_content_key_specs" CASCADE;
  DROP TABLE "product_content" CASCADE;
  DROP TABLE "product_category_content" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_homepage_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_product_content_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_product_category_content_fk";
  
  DROP INDEX "payload_locked_documents_rels_homepage_id_idx";
  DROP INDEX "payload_locked_documents_rels_product_content_id_idx";
  DROP INDEX "payload_locked_documents_rels_product_category_content_i_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "homepage_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "product_content_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "product_category_content_id";`)
}
