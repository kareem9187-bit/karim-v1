CREATE TABLE "emails" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resend_id" text,
	"direction" text NOT NULL,
	"from_email" text NOT NULL,
	"from_name" text,
	"to_email" text NOT NULL,
	"to_name" text,
	"subject" text NOT NULL,
	"body" text NOT NULL,
	"body_text" text,
	"status" text DEFAULT 'sent',
	"read" boolean DEFAULT false,
	"starred" boolean DEFAULT false,
	"folder" text DEFAULT 'inbox',
	"thread_id" text,
	"reply_to_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
