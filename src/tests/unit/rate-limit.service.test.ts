import { describe, it, expect, vi, beforeEach } from "vitest";
import { enforceRateLimit } from "@/modules/rate-limit/services/rate-limit.service";
import { TooManyRequestsError } from "@/shared/errors/too-many-requests-error";
// Importamos a instância para poder manipular os mocks
import { prisma } from "@/infrastructure/prisma/prisma";

// 1. Mock do caminho onde o Prisma está definido
vi.mock("@/infrastructure/prisma/prisma", () => ({
  prisma: {
    rateLimit: {
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
  },
}));

describe("rate-limit.service", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Limpa o histórico de chamadas entre os testes
  });

  it("should allow request under limit", async () => {
    // Simula que não encontrou nenhum registro (primeira vez do usuário)
    vi.mocked(prisma.rateLimit.findFirst).mockResolvedValue(null);

    await expect(
      enforceRateLimit("user-id", {
        action: "CREATE_TODO",
        limit: 20,
        windowSeconds: 60,
      }),
    ).resolves.not.toThrow();

    expect(prisma.rateLimit.create).toHaveBeenCalled();
  });

  it("should throw error when limit exceeded", async () => {
    // Simula que já atingiu o limite de 20
    vi.mocked(prisma.rateLimit.findFirst).mockResolvedValue({
      id: "uuid",
      userId: "user-id",
      action: "CREATE_TODO",
      count: 20,
      windowStart: new Date(),
    });

    await expect(
      enforceRateLimit("user-id", {
        action: "CREATE_TODO",
        limit: 20,
        windowSeconds: 60,
      }),
    ).rejects.toThrow(TooManyRequestsError);

    // Garante que o update NÃO foi chamado se o limite estourou
    expect(prisma.rateLimit.update).not.toHaveBeenCalled();
  });
});
