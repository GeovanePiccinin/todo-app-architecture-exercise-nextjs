import { prisma } from "./prisma";

export type DbClient = typeof prisma;
export type DbTransaction = Parameters<
  Parameters<typeof prisma.$transaction>[0]
>[0];
