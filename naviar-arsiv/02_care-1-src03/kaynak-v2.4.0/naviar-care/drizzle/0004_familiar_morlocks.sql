DROP INDEX `slots_start`;--> statement-breakpoint
CREATE UNIQUE INDEX `slots_start` ON `slots` (`start`) WHERE "slots"."active" = 1;