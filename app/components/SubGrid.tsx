import Cell from "@/app/components/Cell";
import React, { useMemo } from "react";
import { zeroToEight } from "@/app/components/constants";
import type { CellCoords, GridData } from "@/app/components/types";

const SubGrid: React.FC<{
  subGridNum: number;
  previewMode?: boolean;
  grid: GridData;
  isCorrect?: boolean;
  onCellClick?: (coords: CellCoords) => void;
  selectedCell?: CellCoords | null;
}> = ({ subGridNum, previewMode, grid, isCorrect, onCellClick, selectedCell }) => {
  const cellCoords: CellCoords[] = useMemo(() => {
    const rowStart = Math.floor(subGridNum / 3) * 3;
    const colStart = (subGridNum % 3) * 3;

    return zeroToEight.map((num) => ({
      row: rowStart + Math.floor(num / 3),
      col: colStart + (num % 3)
    }))
  }, [subGridNum]);

  const previewOrEditModeStyles = previewMode ? ' bg-transparent' : ' bg-gray-300';

  return <div className={'col-span-1 row-span-1 grid grid-cols-3 grid-rows-3 gap-0.5' + previewOrEditModeStyles}>
    {
      cellCoords.map((coords) => <Cell
        key={coords.row + '-' + coords.col}
        previewMode={previewMode}
        grid={grid}
        isCorrect={isCorrect}
        onClick={onCellClick}
        selectedCell={selectedCell}
        coords={coords}
      />)
    }
  </div>;
}

export default SubGrid;
