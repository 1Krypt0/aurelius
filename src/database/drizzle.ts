import { drizzle } from 'drizzle-orm/neon-http';
import { NEON_DATABASE_URL } from '$env/static/private';
import { neon } from '@neondatabase/serverless';

// NOTE: Re-add when they get out of beta
// import { XataClient } from './xata';
//
// const xata = new XataClient({ apiKey: XATA_API_KEY, branch: XATA_BRANCH });

const sql = neon(NEON_DATABASE_URL);
const db = drizzle(sql);

export default db;
