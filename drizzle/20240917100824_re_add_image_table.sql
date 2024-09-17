CREATE TABLE IF NOT EXISTS "image" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"product_id" text NOT NULL,
	CONSTRAINT "image_url_unique" UNIQUE("url")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "image" ADD CONSTRAINT "image_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
