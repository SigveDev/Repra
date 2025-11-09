import { getActiveWorkout } from "@/services/server/workouts";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { success: false, message: "Username query parameter is required." },
      { status: 400 }
    );
  }

  console.log(`Checking active workout for: ${username}`);

  const activeWorkout = await getActiveWorkout(username);

  if (activeWorkout) {
    return NextResponse.json({ activeWorkout: true }, { status: 200 });
  } else {
    return NextResponse.json({ activeWorkout: false }, { status: 200 });
  }
}
