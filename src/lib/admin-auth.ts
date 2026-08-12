import type { NextRequest } from "next/server";
import { getSessionUser, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function isAuthorizedAdminRequest(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = await getSessionUser(token);
  return !!user;
}
