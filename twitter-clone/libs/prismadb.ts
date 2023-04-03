import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}
// prevent hot reloads multyples instances
const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;
export default client;
