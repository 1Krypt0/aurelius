import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { Resource } from 'sst';

const NeonUrl = Resource.NeonUrl.value

const sql = neon(NeonUrl);
const db = drizzle(sql);

export default db;
