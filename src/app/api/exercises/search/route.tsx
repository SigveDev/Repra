import { exercisesSearch } from "@/services/server/tablesDB";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  const exercises = await exercisesSearch(query);

  return NextResponse.json(exercises);
}
