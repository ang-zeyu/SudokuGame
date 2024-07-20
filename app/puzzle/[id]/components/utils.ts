import type { CellCoords, GridData } from '@/app/components/types';

export function cloneGridWoErrors(grid: GridData): GridData {
  return grid.map((row) => row.map((cell) => ({ ...cell, error: false })));
}

export function setGridErrors(
  newGrid: { value: number | null; isPredefined: boolean; error?: boolean }[][],
) {
  // Duplicate values in a row
  for (let row = 0; row < 9; row += 1) {
    const valuesToCols: Record<string, number[]> = {};
    for (let col = 0; col < 9; col += 1) {
      const value = newGrid[row][col].value;
      if (value === null) {
        continue;
      }

      valuesToCols[value] = [...(valuesToCols[value] ?? []), col];
    }

    Object.values(valuesToCols)
      .filter((cols) => cols.length > 1)
      .flatMap((cols) => cols)
      .forEach((col) => {
        newGrid[row][col].error = true;
      });
  }

  // Duplicate values in a col
  for (let col = 0; col < 9; col += 1) {
    const valuesToRows: Record<string, number[]> = {};
    for (let row = 0; row < 9; row += 1) {
      const value = newGrid[row][col].value;
      if (value === null) {
        continue;
      }

      valuesToRows[value] = [...(valuesToRows[value] ?? []), row];
    }

    Object.values(valuesToRows)
      .filter((rows) => rows.length > 1)
      .flatMap((rows) => rows)
      .forEach((row) => {
        newGrid[row][col].error = true;
      });
  }

  // Duplicate values in a subgrid
  for (let subgrid = 0; subgrid < 9; subgrid += 1) {
    const rowStart = Math.floor(subgrid / 3) * 3;
    const rowEnd = rowStart + 3;
    const colStart = (subgrid % 3) * 3;
    const colEnd = colStart + 3;

    const valuesToCoords: Record<string, CellCoords[]> = {};
    for (let row = rowStart; row < rowEnd; row += 1) {
      for (let col = colStart; col < colEnd; col += 1) {
        const value = newGrid[row][col].value;
        if (value === null) {
          continue;
        }

        valuesToCoords[value] = [
          ...(valuesToCoords[value] ?? []),
          { row, col },
        ];
      }
    }

    Object.values(valuesToCoords)
      .filter((coords) => coords.length > 1)
      .flatMap((coords) => coords)
      .forEach((coord) => {
        newGrid[coord.row][coord.col].error = true;
      });
  }
}
