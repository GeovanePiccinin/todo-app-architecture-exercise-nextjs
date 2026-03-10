import { AuditRepository } from "../repositories/audit.repository";
import { AuditLogInput } from "../types/audit.types";

export class AuditService {
  constructor(private readonly repository: AuditRepository) {}

  async log(data: AuditLogInput): Promise<void> {
    await this.repository.create(data);
  }
}

export const auditService = new AuditService(new AuditRepository());
