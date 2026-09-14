CREATE TABLE `care_analytics` (
	`id` text PRIMARY KEY NOT NULL,
	`event` text NOT NULL,
	`section` text NOT NULL,
	`service` text,
	`lang` text NOT NULL,
	`consent_version` text NOT NULL,
	`day` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_care_analytics_day_event` ON `care_analytics` (`day`,`event`);--> statement-breakpoint
CREATE TABLE `care_applications` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`name` text NOT NULL,
	`postcode` text NOT NULL,
	`services` text NOT NULL,
	`lang` text NOT NULL,
	`status` text DEFAULT 'unverified' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_care_applications_owner` ON `care_applications` (`owner`);--> statement-breakpoint
CREATE TABLE `care_audit` (
	`id` text PRIMARY KEY NOT NULL,
	`request_id` text NOT NULL,
	`actor` text NOT NULL,
	`action` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`request_id`) REFERENCES `care_requests`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `care_cases` (
	`id` text PRIMARY KEY NOT NULL,
	`request_id` text NOT NULL,
	`reason` text NOT NULL,
	`status` text DEFAULT 'open' NOT NULL,
	`responsibility` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`request_id`) REFERENCES `care_requests`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `uq_care_case_request_reason` ON `care_cases` (`request_id`,`reason`);--> statement-breakpoint
CREATE TABLE `care_outbox` (
	`id` text PRIMARY KEY NOT NULL,
	`request_id` text NOT NULL,
	`kind` text NOT NULL,
	`status` text DEFAULT 'preview' NOT NULL,
	`attempts` integer DEFAULT 0 NOT NULL,
	`provider_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`request_id`) REFERENCES `care_requests`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_care_outbox_status` ON `care_outbox` (`status`,`updated_at`);--> statement-breakpoint
CREATE TABLE `care_payment_events` (
	`id` text PRIMARY KEY NOT NULL,
	`request_id` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`request_id`) REFERENCES `care_requests`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `care_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`email` text NOT NULL,
	`fingerprint` text NOT NULL,
	`lang` text NOT NULL,
	`name` text NOT NULL,
	`postcode` text NOT NULL,
	`service` text NOT NULL,
	`timing` text NOT NULL,
	`starts_at` integer NOT NULL,
	`duration` integer NOT NULL,
	`for_whom` text NOT NULL,
	`consent` integer DEFAULT 0 NOT NULL,
	`sharing` text DEFAULT 'none' NOT NULL,
	`status` text NOT NULL,
	`amount` integer,
	`payment_state` text DEFAULT 'unpaid' NOT NULL,
	`checkout_id` text,
	`revision` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_care_requests_owner` ON `care_requests` (`owner`,`created_at`);