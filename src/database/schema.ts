import { integer, pgTable } from 'drizzle-orm/pg-core';

export const table = pgTable('test', {
	int: integer('int')
});
