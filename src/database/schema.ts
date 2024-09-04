import { text, pgTable, timestamp, boolean, real, integer } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	isAdmin: boolean('is_admin').notNull().default(false)
});

export const productTable = pgTable('product', {
	id: text('id').primaryKey(),
	name: text('name').notNull(), // NOTE: Check if not unique
	description: text('description').notNull(),
	price: real('price').notNull(),
	startDate: timestamp('start_date', { withTimezone: true }).notNull(),
	endDate: timestamp('end_date', { withTimezone: true }).notNull()
});

export const bidTable = pgTable('bid', {
	id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
	value: real('value').notNull()
});

export const sessionTable = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});
