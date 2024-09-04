import { drizzle } from 'drizzle-orm/xata-http';
import { getXataClient } from './xata';

const xata = getXataClient();
const db = drizzle(xata);

export default db;
