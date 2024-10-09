import { eq } from 'drizzle-orm';
import db from '../../../database/drizzle';
import { userTable, type InsertUser, type SelectUser } from '../../../database/schema';

export class UserService {
	async getAll(): Promise<SelectUser[]> {
		const users = await db.select().from(userTable);

		return users;
	}

	async getOneById(id: string): Promise<SelectUser | null> {
		const user = await db.select().from(userTable).where(eq(userTable.id, id)).limit(1);

		if (user.length !== 1) return null;

		return user[0];
	}

	async getOneByEmail(email: string): Promise<SelectUser | null> {
		const user = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1);

		if (user.length !== 1) return null;

		return user[0];
	}

	async create(user: InsertUser) {
		return db.insert(userTable).values(user);
	}

	async update(id: string, data: Partial<Omit<InsertUser, 'id'>>) {
		return db
			.update(userTable)
			.set({ ...data })
			.where(eq(userTable.id, id));
	}
}
