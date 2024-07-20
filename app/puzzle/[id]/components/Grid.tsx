import SubGrid from "@/app/puzzle/[id]/components/SubGrid";
import { zeroToEight } from "@/app/puzzle/[id]/components/constants";
import type { CellCoords, GridData } from "@/app/puzzle/[id]/components/types";

const Grid: React.FC<{
  previewMode?: boolean;
  grid: GridData;
  isCorrect?: boolean;
  onCellClick?: (coords: CellCoords) => void;
  selectedCell?: CellCoords | null;
}> = ({ previewMode, grid, isCorrect, onCellClick, selectedCell }) => {
  const previewOrEditModeParentStyles = previewMode ? '' : ' rounded-xl border-4 border-gray-400';
  const previewOrEditModeInnerStyles = previewMode ? ' bg-transparent gap-0.5' : ' bg-gray-400 gap-1';

  return <div className={'w-full pt-[100%] relative overflow-hidden' + previewOrEditModeParentStyles}>
    <div className={'absolute top-0 left-0 w-full h-full grid grid-cols-3 grid-rows-3' + previewOrEditModeInnerStyles}>
      {
        zeroToEight.map((subGridNum) => <SubGrid
          key={subGridNum}
          previewMode={previewMode}
          subGridNum={subGridNum}
          grid={grid}
          isCorrect={isCorrect}
          onCellClick={onCellClick}
          selectedCell={selectedCell}
        />)
      }
    </div>
  </div>;
}

export default Grid;
