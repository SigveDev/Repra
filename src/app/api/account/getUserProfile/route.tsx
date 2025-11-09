import { getUserProfileFromUserId } from "@/services/server/users";
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

  console.log(`Getting user profile for: ${username}`);

  const userProfile = await getUserProfileFromUserId(username);

  if (userProfile) {
    return NextResponse.json(userProfile, { status: 200 });
  } else {
    return NextResponse.json(
      { success: false, message: "User profile not found." },
      { status: 404 }
    );
  }
}
