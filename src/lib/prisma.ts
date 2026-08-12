import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
  const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 3306),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // The database is remote, so a round trip costs far more than it did
    // against a local instance — keep the generous timeouts and hold a small
    // pool open rather than paying TCP + auth setup on every request.
    connectTimeout: 30000,
    acquireTimeout: 30000,
    connectionLimit: 5,
    // Shared hosting usually terminates TLS with a self-signed certificate.
    // Set DB_SSL=false to disable, or leave unset to connect without TLS.
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  });

  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
