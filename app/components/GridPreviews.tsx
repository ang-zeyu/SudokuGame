import { getGrids } from "@/api/grids";
import Link from "next/link";
import Grid from "@/app/components/Grid";

export default async function GridPreviews() {
  const grids = await getGrids();

  return <>
    {grids.map((grid) => (
      <Link
        key={grid.id}
        href={`puzzle/${grid.id}`}
        className="min-w-[200px] w-1/4 py-2 px-3 hover:scale-125 transition-transform font-medium text-base"
      >
        <Grid previewMode grid={grid.puzzle} />
      </Link>
    ))}
  </>
}
