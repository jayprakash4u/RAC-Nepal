import type { NextRequest } from "next/server";

// Mirrors the token issued in /api/admin/auth. Kept in one place so every
// admin-only API route checks the same value.
const ADMIN_TOKEN = "rac-admin-token-2024";

export function isAuthorizedAdminRequest(request: NextRequest): boolean {
  return request.cookies.get("admin-auth")?.value === ADMIN_TOKEN;
}
