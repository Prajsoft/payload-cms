import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blog_post_blocks_table_of_contents" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar,
      "title" varchar,
      "auto_generate" boolean DEFAULT true
    );

    CREATE TABLE IF NOT EXISTS "blog_post_blocks_how_to_steps" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar,
      "title" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_blocks_how_to_steps_steps" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "step_title" varchar NOT NULL,
      "description" varchar,
      "image_id" integer
    );

    CREATE TABLE IF NOT EXISTS "blog_post_blocks_table" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar,
      "caption" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_blocks_table_headers" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar
    );

    CREATE TABLE IF NOT EXISTS "blog_post_blocks_table_rows" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "cells" varchar
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "blog_post_blocks_table_of_contents";
    DROP TABLE IF EXISTS "blog_post_blocks_how_to_steps";
    DROP TABLE IF EXISTS "blog_post_blocks_how_to_steps_steps";
    DROP TABLE IF EXISTS "blog_post_blocks_table";
    DROP TABLE IF EXISTS "blog_post_blocks_table_headers";
    DROP TABLE IF EXISTS "blog_post_blocks_table_rows";
  `)
}
