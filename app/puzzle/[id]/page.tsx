import { notFound } from "next/navigation";
import { getCurrentAndNextGrid, getGrids } from "@/api/grids";
import PlayingArea from "@/app/puzzle/[id]/components/PlayingArea";

/*
 Assumptions
 1. The list is hardcoded / non-user generated
 2. We are ok with redeploying-after-hardcoded-db-update to regenerate the list

 Proper revalidation settings / calls will have to be done otherwise
 */
export async function generateStaticParams() {
  // Limit 3 - just a magic number to simulate if we had 1000s of puzzles and for example prebuilt the 100 most popular ones
  const grids = await getGrids({ limit: 3 });

  return grids.map((grid) => ({ id: grid.id, }))
}

const Puzzle = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const { current, next } = await getCurrentAndNextGrid(id);

  if (!current) {
    notFound();
  }

  return (
    <div className="flex-1 w-11/12 md:w-9/12 lg:w-7/12 xl:w-6/12 px-3 max-w-2xl pb-10">
      <PlayingArea initialGrid={current.puzzle} nextId={next?.id} />
    </div>
  );
}

export default Puzzle;
