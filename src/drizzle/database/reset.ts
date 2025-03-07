import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { reset } from 'drizzle-seed';

import * as schema from '@/drizzle/schema';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

async function resetDb() {
    await reset(db, schema);
}

resetDb()