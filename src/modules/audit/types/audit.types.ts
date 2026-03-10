export type AuditAction =
  | "USER_LOGIN"
  | "USER_REGISTER"
  | "USER_LOGOUT"
  | "PROFILE_UPDATED"
  | "TODO_CREATED"
  | "TODO_UPDATED"
  | "TODO_COMPLETED"
  | "TODO_DELETED";

export interface AuditLogInput {
  userId: string;
  action: AuditAction;
  entity: string;
  entityId: string;
  metadata?: string;
}
