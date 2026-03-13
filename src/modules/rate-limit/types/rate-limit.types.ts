export type RateLimitAction =
  | "CREATE_TODO"
  | "TOGGLE_TODO"
  | "DELETE_TODO"
  | "LOGIN"
  | "REGISTER";

export interface RateLimitConfig {
  action: RateLimitAction;
  limit: number;
  windowSeconds: number;
}
