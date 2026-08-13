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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthorizedAdminRequest(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.video.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[admin/videos] Failed to delete", error);
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthorizedAdminRequest(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { youtubeId, title, category, startSeconds } = body;

    const row = await prisma.video.update({
      where: { id },
      data: {
        ...(youtubeId ? { youtubeId } : {}),
        ...(title ? { title } : {}),
        ...(category ? { category } : {}),
        ...(startSeconds !== undefined ? { startSeconds: Number(startSeconds) || 0 } : {}),
      },
    });

    return NextResponse.json({ success: true, video: toApiShape(row) });
  } catch (error) {
    console.error("[admin/videos] Failed to update", error);
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}
