import { integer, pgTable, text, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

export const links = pgTable(
	'links',
	{
		id: integer('id').generatedAlwaysAsIdentity().primaryKey(),
		userId: text('user_id').notNull(),
		shortCode: varchar('short_code', { length: 15 }).notNull(),
		url: text('url').notNull(),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
	},
	(table) => [uniqueIndex('links_short_code_unique_idx').on(table.shortCode)]
);

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
