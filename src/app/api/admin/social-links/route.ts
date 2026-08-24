import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { siteConfig } from "@/config/site";

const PLATFORMS = ["facebook", "instagram", "tiktok", "twitter", "youtube"] as const;

export async function GET() {
  try {
    const row = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
    if (!row) {
      return NextResponse.json(siteConfig.topBar.social);
    }

    const links: Record<string, string> = {};
    for (const platform of PLATFORMS) {
      if (row[platform]) links[platform] = row[platform] as string;
    }
    return NextResponse.json(links);
  } catch (error) {
    console.error("[admin/social-links] Failed to load", error);
    return NextResponse.json(siteConfig.topBar.social);
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthorizedAdminRequest(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const data: Record<string, string | null> = {};
    for (const platform of PLATFORMS) {
      const value = body[platform];
      data[platform] = typeof value === "string" && value.trim() ? value.trim() : null;
    }

    const row = await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      create: { id: "singleton", ...data },
      update: data,
    });

    const links: Record<string, string> = {};
    for (const platform of PLATFORMS) {
      if (row[platform]) links[platform] = row[platform] as string;
    }

    return NextResponse.json({ success: true, social: links });
  } catch (error) {
    console.error("[admin/social-links] Failed to update", error);
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}
