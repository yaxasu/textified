import { defineConfig } from "drizzle-kit";
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in the environment variables');
}

export default defineConfig({
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
    schema: './lib/db/schema.ts',
});
