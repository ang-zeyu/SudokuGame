import { getGrids } from "@/api/grids";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const gtId = searchParams.get('after')
  const rawLimit = searchParams.get('limit');
  if (!rawLimit) {
    return NextResponse.json({ message: 'Missing limit' }, { status: 400 })
  }

  const limit = Number(rawLimit);
  if (limit > 100) {
    return NextResponse.json({ message: 'Limit too large' }, { status: 400 })
  }

  const data = await getGrids({
    gtId: gtId ? gtId : undefined,
    limit,
  })

  return Response.json(data)
}
