import {sqliteTable,text,integer,index,uniqueIndex} from 'drizzle-orm/sqlite-core';
import {sql} from 'drizzle-orm';
export const bookings=sqliteTable('bookings',{
 id:text('id').primaryKey(),owner:text('owner').notNull(),requestKey:text('request_key').notNull(),fingerprint:text('fingerprint').notNull(),service:text('service').notNull(),district:text('district').notNull(),slot:text('slot').notNull(),locale:text('locale').notNull(),forWho:text('for_who').notNull(),status:text('status').notNull().default('test_requested'),createdAt:integer('created_at').notNull(),updatedAt:integer('updated_at').notNull()
},t=>[uniqueIndex('uq_booking_request').on(t.owner,t.requestKey),uniqueIndex('uq_active_demo_slot').on(t.slot).where(sql`${t.status} != 'cancelled'`),index('idx_booking_owner_created').on(t.owner,t.createdAt)]);
export const outbox=sqliteTable('outbox',{
 id:text('id').primaryKey(),bookingId:text('booking_id').notNull().references(()=>bookings.id,{onDelete:'cascade'}),status:text('status').notNull().default('preview'),attempts:integer('attempts').notNull().default(0),providerId:text('provider_id'),createdAt:integer('created_at').notNull()
},t=>[uniqueIndex('uq_outbox_booking').on(t.bookingId)]);
export const events=sqliteTable('events',{
 id:text('id').primaryKey(),owner:text('owner').notNull(),event:text('event').notNull(),page:text('page').notNull(),service:text('service'),section:text('section'),locale:text('locale').notNull(),createdAt:integer('created_at').notNull()
},t=>[index('idx_events_owner_created').on(t.owner,t.createdAt)]);
export const payments=sqliteTable('payments',{
 id:text('id').primaryKey(),owner:text('owner').notNull(),bookingId:text('booking_id').notNull().references(()=>bookings.id,{onDelete:'cascade'}),sessionId:text('session_id'),amount:integer('amount').notNull(),currency:text('currency').notNull().default('nok'),status:text('status').notNull().default('pending'),createdAt:integer('created_at').notNull()
},t=>[uniqueIndex('uq_payment_booking').on(t.bookingId),uniqueIndex('uq_payment_session').on(t.sessionId)]);
export const paymentEvents=sqliteTable('payment_events',{id:text('id').primaryKey(),createdAt:integer('created_at').notNull()});
