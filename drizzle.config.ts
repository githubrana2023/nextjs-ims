import 'dotenv/config'
import { defineConfig } from "drizzle-kit";


export default defineConfig({
  dialect: 'postgresql',
  out:'./src/drizzle/migration',
  schema: './src/drizzle/schema.ts',
  verbose:true,
  strict:true,
  dbCredentials:{
    url:process.env.DATABASE_URL!
  }
})
