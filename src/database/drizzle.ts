import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

// NOTE: Re-add when they get out of beta
// import { XataClient } from './xata';
//
// const xata = new XataClient({ apiKey: XATA_API_KEY, branch: XATA_BRANCH });

const sql = neon(process.env.NEON_DATABASE_URL!);
const db = drizzle(sql);

export default db;
