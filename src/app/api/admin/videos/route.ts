import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import type { Video as VideoRow } from "@/generated/prisma/client";

function toApiShape(row: VideoRow) {
  return {
    id: row.id,
    youtubeId: row.youtubeId,
    title: row.title,
    category: row.category,
    startSeconds: row.startSeconds ?? undefined,
  };
}

export async function GET() {
  try {
    const rows = await prisma.video.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(rows.map(toApiShape));
  } catch (error) {
    console.error("[admin/videos] Failed to list", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorizedAdminRequest(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { youtubeId, title, category, startSeconds = 0 } = body;

    if (!youtubeId || !title || !category) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const maxOrder = await prisma.video.aggregate({ _max: { order: true } });
    const row = await prisma.video.create({
      data: {
        youtubeId,
        title,
        category,
        startSeconds: Number(startSeconds) || 0,
        order: (maxOrder._max.order ?? -1) + 1,
      },
    });

    return NextResponse.json({ success: true, video: toApiShape(row) });
  } catch (error) {
    console.error("[admin/videos] Failed to create", error);
    return NextResponse.json({ success: false, message: "Failed to add video" }, { status: 500 });
  }
}
