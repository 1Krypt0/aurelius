import { text, pgTable, timestamp, boolean, real, integer } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	isAdmin: boolean('is_admin').notNull().default(false)
});

export type SelectUser = typeof userTable.$inferSelect;

export const productTable = pgTable('product', {
	id: text('id').primaryKey(),
	name: text('name').notNull(), // NOTE: Check if not unique
	description: text('description').notNull(),
	price: real('price').notNull(),
	startDate: timestamp('start_date', { withTimezone: true }).notNull(),
	endDate: timestamp('end_date', { withTimezone: true }).notNull(),
	sold: boolean('sold').notNull().default(false),
	paid: boolean('paid').notNull().default(false),
	userId: text('user_id').references(() => userTable.id)
});

export type InsertProduct = typeof productTable.$inferInsert;
export type SelectProduct = typeof productTable.$inferSelect;

export const imageTable = pgTable('image', {
	id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
	url: text('url').notNull().unique(),
	productId: text('product_id')
		.notNull()
		.references(() => productTable.id)
});

export type SelectImage = typeof imageTable.$inferSelect;

export const bidTable = pgTable('bid', {
	id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
	value: real('value').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	productId: text('product_id')
		.notNull()
		.references(() => productTable.id)
});

export type SelectBid = typeof bidTable.$inferSelect;

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
