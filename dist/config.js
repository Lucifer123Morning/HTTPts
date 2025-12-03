import dotenv from 'dotenv';
import path from 'path';
// Загружаем .env из корня проекта
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
function envOrThrow(key) {
    const value = process.env[key];
    if (!value)
        throw new Error(`Environment variable ${key} is not set`);
    return value;
}
export const config = {
    api: {
        port: Number(envOrThrow("PORT")),
        fileServerHits: 0,
    },
    db: {
        url: envOrThrow("DB_URL"),
        migrationConfig: { migrationsFolder: "./src/db/migrations" },
    },
    platform: process.env.PLATFORM || "prod",
};
