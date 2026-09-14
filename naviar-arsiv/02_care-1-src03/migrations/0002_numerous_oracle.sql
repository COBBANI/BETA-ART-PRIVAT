CREATE TABLE `care_feedback` (
	`id` text PRIMARY KEY NOT NULL,
	`section` text NOT NULL,
	`lang` text NOT NULL,
	`helpful` text NOT NULL,
	`next_need` text NOT NULL,
	`day` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_care_feedback_day` ON `care_feedback` (`day`);--> statement-breakpoint
CREATE TABLE `care_reservations` (
	`request_id` text PRIMARY KEY NOT NULL,
	`resource` text NOT NULL,
	`starts_at` integer NOT NULL,
	`ends_at` integer NOT NULL,
	`hold_until` integer NOT NULL,
	`state` text DEFAULT 'held' NOT NULL,
	FOREIGN KEY (`request_id`) REFERENCES `care_requests`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_care_reservations_resource` ON `care_reservations` (`resource`,`starts_at`);--> statement-breakpoint
ALTER TABLE `care_cases` ADD `assigned_to` text;--> statement-breakpoint
ALTER TABLE `care_cases` ADD `claimed_at` integer;--> statement-breakpoint
ALTER TABLE `care_cases` ADD `reviewed_at` integer;--> statement-breakpoint
ALTER TABLE `care_outbox` ADD `lease_until` integer;--> statement-breakpoint
ALTER TABLE `care_outbox` ADD `next_attempt_at` integer;--> statement-breakpoint
ALTER TABLE `care_outbox` ADD `first_attempt_at` integer;--> statement-breakpoint
ALTER TABLE `care_outbox` ADD `last_error` text;--> statement-breakpoint
ALTER TABLE `care_requests` ADD `payment_attempt` text;--> statement-breakpoint
ALTER TABLE `care_requests` ADD `checkout_started_at` integer;