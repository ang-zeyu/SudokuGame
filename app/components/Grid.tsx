import SubGrid from "@/app/components/SubGrid";
import { zeroToEight } from "@/app/components/constants";
import type { CellCoords, GridData } from "@/app/components/types";

const Grid: React.FC<{
  loading?: boolean;
  previewMode?: boolean;
  grid: GridData;
  isCorrect?: boolean;
  onCellClick?: (coords: CellCoords) => void;
  selectedCell?: CellCoords | null;
}> = ({
  loading,
  previewMode,
  grid,
  isCorrect,
  onCellClick,
  selectedCell,
}) => {
  let previewOrEditModeParentStyles = '';
  let previewOrEditModeInnerStyles = '';

  if (previewMode) {
    previewOrEditModeInnerStyles += ' bg-transparent gap-0.5';
  } else {
    previewOrEditModeParentStyles += ' rounded-xl border-4 border-gray-400';
    previewOrEditModeInnerStyles += ' bg-gray-400 gap-1';
  }

  if (loading) {
    previewOrEditModeInnerStyles += ' opacity-50';
  }

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
