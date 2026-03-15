import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blog_post_blocks_hero_image" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar,
      "image_id" integer NOT NULL,
      "alt" varchar,
      "caption" varchar,
      "height" varchar DEFAULT 'md',
      "object_position" varchar DEFAULT 'center',
      "overlay_enabled" boolean DEFAULT false,
      "overlay_opacity" numeric DEFAULT 40,
      "overlay_headline" varchar,
      "overlay_subheadline" varchar
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "blog_post_blocks_hero_image";
  `)
}
