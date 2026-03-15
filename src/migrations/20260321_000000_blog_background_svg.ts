import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "blog" ADD COLUMN IF NOT EXISTS "background_svg_id" integer;

    ALTER TABLE "blog" ADD CONSTRAINT "blog_background_svg_id_media_id_fk"
      FOREIGN KEY ("background_svg_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "blog_background_svg_idx" ON "blog" USING btree ("background_svg_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "blog" DROP CONSTRAINT IF EXISTS "blog_background_svg_id_media_id_fk";
    DROP INDEX IF EXISTS "blog_background_svg_idx";
    ALTER TABLE "blog" DROP COLUMN IF EXISTS "background_svg_id";
  `)
}
