import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'About SVB Sports' NOT NULL,
  	"intro" varchar,
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
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Contact Us' NOT NULL,
  	"intro" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"location" varchar,
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
  
  CREATE TABLE "faq_page_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "faq_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Frequently Asked Questions' NOT NULL,
  	"intro" varchar,
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
  
  CREATE TABLE "shipping_returns_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Shipping & Returns' NOT NULL,
  	"shipping_title" varchar DEFAULT 'Shipping',
  	"shipping_content" jsonb,
  	"returns_title" varchar DEFAULT 'Returns',
  	"returns_content" jsonb,
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
  
  CREATE TABLE "privacy_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"content" jsonb
  );
  
  CREATE TABLE "privacy_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Privacy Policy' NOT NULL,
  	"last_updated" timestamp(3) with time zone,
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
  
  CREATE TABLE "terms_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"content" jsonb
  );
  
  CREATE TABLE "terms_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Terms & Conditions' NOT NULL,
  	"last_updated" timestamp(3) with time zone,
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
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "about_page_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "contact_page_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faq_page_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "shipping_returns_page_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "privacy_page_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "terms_page_id" integer;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_seo_open_graph_og_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_seo_open_graph_og_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faq_page_faqs" ADD CONSTRAINT "faq_page_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_page" ADD CONSTRAINT "faq_page_seo_open_graph_og_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shipping_returns_page" ADD CONSTRAINT "shipping_returns_page_seo_open_graph_og_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "privacy_page_sections" ADD CONSTRAINT "privacy_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page" ADD CONSTRAINT "privacy_page_seo_open_graph_og_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "terms_page_sections" ADD CONSTRAINT "terms_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terms_page" ADD CONSTRAINT "terms_page_seo_open_graph_og_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "about_page_seo_open_graph_seo_open_graph_og_image_idx" ON "about_page" USING btree ("seo_open_graph_og_image_id");
  CREATE INDEX "about_page_updated_at_idx" ON "about_page" USING btree ("updated_at");
  CREATE INDEX "about_page_created_at_idx" ON "about_page" USING btree ("created_at");
  CREATE INDEX "contact_page_seo_open_graph_seo_open_graph_og_image_idx" ON "contact_page" USING btree ("seo_open_graph_og_image_id");
  CREATE INDEX "contact_page_updated_at_idx" ON "contact_page" USING btree ("updated_at");
  CREATE INDEX "contact_page_created_at_idx" ON "contact_page" USING btree ("created_at");
  CREATE INDEX "faq_page_faqs_order_idx" ON "faq_page_faqs" USING btree ("_order");
  CREATE INDEX "faq_page_faqs_parent_id_idx" ON "faq_page_faqs" USING btree ("_parent_id");
  CREATE INDEX "faq_page_seo_open_graph_seo_open_graph_og_image_idx" ON "faq_page" USING btree ("seo_open_graph_og_image_id");
  CREATE INDEX "faq_page_updated_at_idx" ON "faq_page" USING btree ("updated_at");
  CREATE INDEX "faq_page_created_at_idx" ON "faq_page" USING btree ("created_at");
  CREATE INDEX "shipping_returns_page_seo_open_graph_seo_open_graph_og_i_idx" ON "shipping_returns_page" USING btree ("seo_open_graph_og_image_id");
  CREATE INDEX "shipping_returns_page_updated_at_idx" ON "shipping_returns_page" USING btree ("updated_at");
  CREATE INDEX "shipping_returns_page_created_at_idx" ON "shipping_returns_page" USING btree ("created_at");
  CREATE INDEX "privacy_page_sections_order_idx" ON "privacy_page_sections" USING btree ("_order");
  CREATE INDEX "privacy_page_sections_parent_id_idx" ON "privacy_page_sections" USING btree ("_parent_id");
  CREATE INDEX "privacy_page_seo_open_graph_seo_open_graph_og_image_idx" ON "privacy_page" USING btree ("seo_open_graph_og_image_id");
  CREATE INDEX "privacy_page_updated_at_idx" ON "privacy_page" USING btree ("updated_at");
  CREATE INDEX "privacy_page_created_at_idx" ON "privacy_page" USING btree ("created_at");
  CREATE INDEX "terms_page_sections_order_idx" ON "terms_page_sections" USING btree ("_order");
  CREATE INDEX "terms_page_sections_parent_id_idx" ON "terms_page_sections" USING btree ("_parent_id");
  CREATE INDEX "terms_page_seo_open_graph_seo_open_graph_og_image_idx" ON "terms_page" USING btree ("seo_open_graph_og_image_id");
  CREATE INDEX "terms_page_updated_at_idx" ON "terms_page" USING btree ("updated_at");
  CREATE INDEX "terms_page_created_at_idx" ON "terms_page" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_about_page_fk" FOREIGN KEY ("about_page_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_page_fk" FOREIGN KEY ("contact_page_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_page_fk" FOREIGN KEY ("faq_page_id") REFERENCES "public"."faq_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_shipping_returns_page_fk" FOREIGN KEY ("shipping_returns_page_id") REFERENCES "public"."shipping_returns_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_privacy_page_fk" FOREIGN KEY ("privacy_page_id") REFERENCES "public"."privacy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_terms_page_fk" FOREIGN KEY ("terms_page_id") REFERENCES "public"."terms_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_about_page_id_idx" ON "payload_locked_documents_rels" USING btree ("about_page_id");
  CREATE INDEX "payload_locked_documents_rels_contact_page_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_page_id");
  CREATE INDEX "payload_locked_documents_rels_faq_page_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_page_id");
  CREATE INDEX "payload_locked_documents_rels_shipping_returns_page_id_idx" ON "payload_locked_documents_rels" USING btree ("shipping_returns_page_id");
  CREATE INDEX "payload_locked_documents_rels_privacy_page_id_idx" ON "payload_locked_documents_rels" USING btree ("privacy_page_id");
  CREATE INDEX "payload_locked_documents_rels_terms_page_id_idx" ON "payload_locked_documents_rels" USING btree ("terms_page_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faq_page_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faq_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shipping_returns_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "terms_page_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "terms_page" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "faq_page_faqs" CASCADE;
  DROP TABLE "faq_page" CASCADE;
  DROP TABLE "shipping_returns_page" CASCADE;
  DROP TABLE "privacy_page_sections" CASCADE;
  DROP TABLE "privacy_page" CASCADE;
  DROP TABLE "terms_page_sections" CASCADE;
  DROP TABLE "terms_page" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_about_page_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_contact_page_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faq_page_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_shipping_returns_page_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_privacy_page_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_terms_page_fk";
  
  DROP INDEX "payload_locked_documents_rels_about_page_id_idx";
  DROP INDEX "payload_locked_documents_rels_contact_page_id_idx";
  DROP INDEX "payload_locked_documents_rels_faq_page_id_idx";
  DROP INDEX "payload_locked_documents_rels_shipping_returns_page_id_idx";
  DROP INDEX "payload_locked_documents_rels_privacy_page_id_idx";
  DROP INDEX "payload_locked_documents_rels_terms_page_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "about_page_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "contact_page_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faq_page_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "shipping_returns_page_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "privacy_page_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "terms_page_id";`)
}
