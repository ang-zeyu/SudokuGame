import { createClient } from "@/utils/supabase/server";
import type { GridData } from "@/app/puzzle/[id]/components/types";

function rawPuzzleToGrid(puzzle: string) {
  const gridData: GridData = [[], [], [], [], [], [], [], [], []];

  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      const num = Number(puzzle[row * 9 + col]);

      gridData[row][col] = {
        value: Number.isNaN(num) ? null : num,
        isPredefined: !Number.isNaN(num),
      }
    }
  }
  return gridData;
}

export async function getGrids({ gteId, limit }: { gteId?: string, limit?: number } = {}): Promise<{
  id: string;
  puzzle: GridData;
}[]> {
  const supabase = createClient();

  let query = supabase.from("sudoku_puzzles").select().order('id', { ascending: true });
  if (limit !== undefined) query = query.limit(limit)
  if (gteId !== undefined) query = query.gte('id', gteId)
  const { data } = await query;

  const rawData = data as ({
    id: string;
    puzzle: string;
  }[] | null) ?? [];

  const gridDatas: { id: string; puzzle: GridData; }[] = [];

  for (const { id, puzzle } of rawData) {
    const gridData = rawPuzzleToGrid(puzzle);

    gridDatas.push({
      id,
      puzzle: gridData,
    });
  }

  return gridDatas;
}

export async function getCurrentAndNextGrid(id: string) {
  const currAndNext = await getGrids({ gteId: id, limit: 2 });

  return {
    current: currAndNext[0]?.id === id ? currAndNext[0] : null,
    next: currAndNext.length > 1 ? currAndNext[1] : null,
  };
}
