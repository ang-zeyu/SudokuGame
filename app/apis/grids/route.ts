import { getGrids } from "@/api/grids";
import {NextResponse} from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const gtId = searchParams.get('after')
    const rawLimit = searchParams.get('limit');
    if (!rawLimit) {
      return NextResponse.json({ message: 'Missing limit' }, { status: 400 })
    }

    const limit = Number(rawLimit);
    if (Number.isNaN(limit)) {
      return NextResponse.json({ message: 'Non-numeric limit' }, { status: 400 })
    } else if (limit > 100) {
      return NextResponse.json({ message: 'Limit too large' }, { status: 400 })
    }

    const data = await getGrids({
      gtId: gtId ? gtId : undefined,
      limit,
    })

    return Response.json(data)
  } catch (ex) {
    console.error(ex);
    return NextResponse.json({ message: 'Unknown error' }, { status: 500 })
  }
}
