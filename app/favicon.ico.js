import { NextResponse } from "next/server"

export async function GET() {
  // Redirect to the static favicon in the public directory
  return new NextResponse(null, {
    status: 307,
    headers: {
      Location: "/favicon.ico",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  })
}
