import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { ok: false, message: "Enter a valid email." },
        { status: 400 }
      );
    }

    // TEMP: allow any email so site deploys
    // Stripe check will go here later
    const discord = process.env.DISCORD_INVITE_URL || "";

    return NextResponse.json({ ok: true, discord });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Server error." },
      { status: 500 }
    );
  }
}
