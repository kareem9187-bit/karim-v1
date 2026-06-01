CREATE TABLE "availability" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"day_of_week" integer NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "availability_overrides" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" date NOT NULL,
	"slots" json DEFAULT '[]'::json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "availability_overrides_date_unique" UNIQUE("date")
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_type_id" uuid,
	"booking_date" date NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"client_name" text NOT NULL,
	"client_email" text NOT NULL,
	"custom_answers" json DEFAULT '{}'::json,
	"payment_status" text DEFAULT 'pending',
	"meeting_link" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "brands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order" integer NOT NULL,
	"name" text NOT NULL,
	"logo" text,
	"style" text,
	"active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "contact_info" (
	"id" text PRIMARY KEY DEFAULT 'main' NOT NULL,
	"whatsapp" text,
	"email" text,
	"phone" text,
	"tagline" text,
	"tagline_ar" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text,
	"project_type" text,
	"budget" text,
	"timeline" text,
	"message" text,
	"source" text,
	"read" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"name_ar" text,
	"code" text NOT NULL,
	"flag" text,
	"is_home" boolean DEFAULT false,
	"active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "event_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"duration_minutes" integer DEFAULT 30 NOT NULL,
	"price" numeric(10, 2) DEFAULT '0',
	"color" text DEFAULT '#5fa3e0',
	"is_active" boolean DEFAULT true,
	"buffer_before" integer DEFAULT 0,
	"buffer_after" integer DEFAULT 0,
	"max_per_day" integer,
	"start_time_increment" integer DEFAULT 30,
	"timezone_display" text DEFAULT 'auto',
	"locked_timezone" text,
	"allow_guests" boolean DEFAULT false,
	"invitee_questions" json DEFAULT '[]'::json,
	"communication_methods" json DEFAULT '["google_meet"]'::json,
	"confirmation_redirect" text,
	"email_reminder_hours" integer,
	"email_followup_hours" integer,
	"min_notice_hours" integer DEFAULT 4,
	"max_future_days" integer DEFAULT 60,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "event_types_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "faqs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order" integer NOT NULL,
	"question" text NOT NULL,
	"question_ar" text,
	"answer" text NOT NULL,
	"answer_ar" text,
	"active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "hero" (
	"id" text PRIMARY KEY DEFAULT 'main' NOT NULL,
	"greeting" text,
	"greeting_ar" text,
	"name" text DEFAULT 'Karim Abdelaziz' NOT NULL,
	"name_ar" text,
	"tagline" text,
	"tagline_ar" text,
	"cta_primary_text" text,
	"cta_primary_text_ar" text,
	"cta_primary_link" text,
	"cta_secondary_text" text,
	"cta_secondary_text_ar" text,
	"cta_secondary_link" text,
	"image" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"filename" text NOT NULL,
	"type" text NOT NULL,
	"size" integer,
	"width" integer,
	"height" integer,
	"alt" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "process_steps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order" integer NOT NULL,
	"title" text NOT NULL,
	"title_ar" text,
	"description" text NOT NULL,
	"description_ar" text,
	"icon" text,
	"time_label" text,
	"time_label_ar" text,
	"active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order" integer NOT NULL,
	"title" text NOT NULL,
	"title_ar" text,
	"description" text NOT NULL,
	"description_ar" text,
	"icon" text,
	"active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" json,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" text PRIMARY KEY DEFAULT 'main' NOT NULL,
	"site_name" text DEFAULT 'Karim Abdelaziz' NOT NULL,
	"site_name_ar" text,
	"description" text,
	"description_ar" text,
	"keywords" text,
	"theme_color" text DEFAULT '#04060a',
	"og_image" text,
	"favicon" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order" integer NOT NULL,
	"platform" text NOT NULL,
	"url" text NOT NULL,
	"label" text,
	"icon" text,
	"active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "stats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order" integer NOT NULL,
	"number" text NOT NULL,
	"label" text NOT NULL,
	"label_ar" text,
	"icon" text,
	"active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "story_chapters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order" integer NOT NULL,
	"eyebrow" text,
	"eyebrow_ar" text,
	"title" text NOT NULL,
	"title_ar" text,
	"text" text,
	"text_ar" text,
	"image" text,
	"image_badge" text,
	"image_badge_ar" text,
	"stats" json,
	"reversed" boolean DEFAULT false,
	"active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order" integer NOT NULL,
	"name" text NOT NULL,
	"role" text,
	"avatar" text,
	"text" text NOT NULL,
	"text_ar" text,
	"rating" integer DEFAULT 5,
	"is_video" boolean DEFAULT false,
	"video_url" text,
	"is_featured" boolean DEFAULT false,
	"row" integer DEFAULT 1,
	"active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "training_info" (
	"id" text PRIMARY KEY DEFAULT 'main' NOT NULL,
	"title" text,
	"title_ar" text,
	"description" text,
	"description_ar" text,
	"points" json,
	"points_ar" json,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "training_stats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order" integer NOT NULL,
	"number" text NOT NULL,
	"label" text NOT NULL,
	"label_ar" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"password" text NOT NULL,
	"role" text DEFAULT 'admin' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "welcome_chapters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order" integer NOT NULL,
	"number" text NOT NULL,
	"suffix" text,
	"suffix_ar" text,
	"label" text NOT NULL,
	"label_ar" text,
	"phrase" text NOT NULL,
	"phrase_ar" text,
	"sub_text" text,
	"sub_text_ar" text,
	"is_intro" boolean DEFAULT false,
	"is_final" boolean DEFAULT false,
	"active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "works" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order" integer NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"title_ar" text,
	"category" text NOT NULL,
	"category_ar" text,
	"description" text,
	"description_ar" text,
	"thumbnail" text,
	"video_url" text,
	"featured" boolean DEFAULT false,
	"coming_soon" boolean DEFAULT false,
	"active" boolean DEFAULT true,
	"service_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "works_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_event_type_id_event_types_id_fk" FOREIGN KEY ("event_type_id") REFERENCES "public"."event_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "works" ADD CONSTRAINT "works_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE no action ON UPDATE no action;