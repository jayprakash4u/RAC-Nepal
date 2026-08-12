import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";

const AUTHOR = "RAC Nepal Rheumatology Team";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthorizedAdminRequest(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const post = await prisma.blogPost.findUnique({ where: { id } });

    if (!post) {
      return NextResponse.json({ article: { author: AUTHOR, sections: [] } });
    }

    let sections: unknown[] = [];
    try {
      sections = JSON.parse(post.sections);
    } catch {
      sections = [];
    }

    return NextResponse.json({ article: { author: AUTHOR, sections } });
  } catch (error) {
    console.error("[admin/blogs] Failed to load article", error);
    return NextResponse.json({ article: { author: AUTHOR, sections: [] } });
  }
}
