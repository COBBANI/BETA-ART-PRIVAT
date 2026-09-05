CREATE TABLE `bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`request_key` text NOT NULL,
	`fingerprint` text NOT NULL,
	`service` text NOT NULL,
	`district` text NOT NULL,
	`slot` text NOT NULL,
	`locale` text NOT NULL,
	`for_who` text NOT NULL,
	`status` text DEFAULT 'test_requested' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `uq_booking_request` ON `bookings` (`owner`,`request_key`);--> statement-breakpoint
CREATE UNIQUE INDEX `uq_active_demo_slot` ON `bookings` (`slot`) WHERE "bookings"."status" != 'cancelled';--> statement-breakpoint
CREATE INDEX `idx_booking_owner_created` ON `bookings` (`owner`,`created_at`);--> statement-breakpoint
CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`event` text NOT NULL,
	`page` text NOT NULL,
	`service` text,
	`section` text,
	`locale` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_events_owner_created` ON `events` (`owner`,`created_at`);--> statement-breakpoint
CREATE TABLE `outbox` (
	`id` text PRIMARY KEY NOT NULL,
	`booking_id` text NOT NULL,
	`status` text DEFAULT 'preview' NOT NULL,
	`attempts` integer DEFAULT 0 NOT NULL,
	`provider_id` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `uq_outbox_booking` ON `outbox` (`booking_id`);--> statement-breakpoint
CREATE TABLE `payment_events` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`booking_id` text NOT NULL,
	`session_id` text,
	`amount` integer NOT NULL,
	`currency` text DEFAULT 'nok' NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `uq_payment_booking` ON `payments` (`booking_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `uq_payment_session` ON `payments` (`session_id`);