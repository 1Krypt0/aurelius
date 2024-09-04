import { drizzle } from 'drizzle-orm/xata-http';
import { XATA_API_KEY, XATA_BRANCH } from '$env/static/private';
import { XataClient } from './xata';

const xata = new XataClient({ apiKey: XATA_API_KEY, branch: XATA_BRANCH });
const db = drizzle(xata);

export default db;
