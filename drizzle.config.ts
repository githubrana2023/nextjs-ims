import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
config({ path: '.env' });

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migration",
  dialect: "postgresql",
  schemaFilter: "public",
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});