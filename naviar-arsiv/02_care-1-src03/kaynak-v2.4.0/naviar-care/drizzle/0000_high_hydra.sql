CREATE TABLE `audit` (
	`id` text PRIMARY KEY NOT NULL,
	`actor` text NOT NULL,
	`action` text NOT NULL,
	`target` text NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`slot_id` text NOT NULL,
	`owner` text NOT NULL,
	`idem` text NOT NULL,
	`service` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`locale` text NOT NULL,
	`relationship` text NOT NULL,
	`status` text DEFAULT 'confirmed' NOT NULL,
	`demo` integer NOT NULL,
	`created` integer NOT NULL,
	`total` integer,
	`offer_version` integer DEFAULT 0 NOT NULL,
	`payment` text DEFAULT 'not_requested' NOT NULL,
	`stripe_session` text,
	FOREIGN KEY (`slot_id`) REFERENCES `slots`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `booking_idem` ON `bookings` (`owner`,`idem`);--> statement-breakpoint
CREATE INDEX `booking_owner` ON `bookings` (`owner`);--> statement-breakpoint
CREATE INDEX `booking_created` ON `bookings` (`created`);--> statement-breakpoint
CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`session` text NOT NULL,
	`kind` text NOT NULL,
	`section` text NOT NULL,
	`locale` text NOT NULL,
	`day` text NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `event_once` ON `events` (`session`,`kind`,`section`,`day`);--> statement-breakpoint
CREATE INDEX `event_date` ON `events` (`created`);--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`idem` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`topic` text NOT NULL,
	`body` text NOT NULL,
	`locale` text NOT NULL,
	`demo` integer NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `message_idem` ON `messages` (`owner`,`idem`);--> statement-breakpoint
CREATE TABLE `outbox` (
	`id` text PRIMARY KEY NOT NULL,
	`booking_id` text NOT NULL,
	`kind` text NOT NULL,
	`state` text DEFAULT 'pending' NOT NULL,
	`attempts` integer DEFAULT 0 NOT NULL,
	`provider_id` text,
	`created` integer NOT NULL,
	`last_attempt` integer
);
--> statement-breakpoint
CREATE TABLE `rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `slots` (
	`id` text PRIMARY KEY NOT NULL,
	`start` integer NOT NULL,
	`end` integer NOT NULL,
	`demo` integer DEFAULT 1 NOT NULL,
	`active` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `slots_start` ON `slots` (`start`);--> statement-breakpoint
CREATE TABLE `webhook_events` (
	`id` text PRIMARY KEY NOT NULL,
	`created` integer NOT NULL
);
