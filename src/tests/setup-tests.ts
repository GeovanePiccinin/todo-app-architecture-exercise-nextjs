import "@testing-library/jest-dom";
// src/__tests__/setup.ts
import { PrismaClient } from "@/generated/prisma/client";
import { beforeEach, vi } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

// Substitua pelo caminho real onde você exporta 'const prisma = new PrismaClient()'
vi.mock("@/infrastructure/prisma/prisma", () => ({
  prisma: mockDeep<PrismaClient>(),
}));

import { prisma } from "@/infrastructure/prisma/prisma";

beforeEach(() => {
  // Reseta o histórico de chamadas e retornos entre cada teste
  mockReset(prisma);
});
