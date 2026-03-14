import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "is_active" boolean DEFAULT false;

    CREATE INDEX IF NOT EXISTS "homepage_is_active_idx" ON "homepage" ("is_active");

    -- Mark the most recently updated homepage as active so the storefront
    -- still works immediately after deploy (before editor manually switches)
    UPDATE "homepage"
    SET "is_active" = true
    WHERE "id" = (SELECT "id" FROM "homepage" ORDER BY "updated_at" DESC LIMIT 1)
      AND NOT EXISTS (SELECT 1 FROM "homepage" WHERE "is_active" = true);
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "homepage_is_active_idx";
    ALTER TABLE "homepage" DROP COLUMN IF EXISTS "is_active";
  `)
}
