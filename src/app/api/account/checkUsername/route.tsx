import { isUsernameAvailable } from "@/services/server/users";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { available: false, message: "Username query parameter is required." },
      { status: 200 }
    );
  }

  console.log(`Checking availability of username: ${username}`);

  if (username.length < 3 || username.length > 20) {
    return NextResponse.json(
      {
        available: false,
        message: "Username must be between 3 and 20 characters.",
      },
      { status: 200 }
    );
  }

  if (await isUsernameAvailable(username)) {
    return NextResponse.json({ available: true }, { status: 200 });
  } else {
    return NextResponse.json(
      { available: false, message: "Username is already taken." },
      { status: 200 }
    );
  }
}
