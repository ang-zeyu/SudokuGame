'use client';

import type { CellCoords, GridData } from '@/app/components/types';

const Cell: React.FC<{
  previewMode?: boolean;
  grid: GridData;
  isCorrect?: boolean;
  selectedCell?: CellCoords | null;
  onClick?: (coords: CellCoords) => void;
  coords: CellCoords;
}> = ({ previewMode, grid, isCorrect, selectedCell, onClick, coords }) => {
  let isCellDirectlySelected = false;
  let isCellSelectedBySubgrid = false;
  let isCellSelectedByRow = false;
  let isCellSelectedByCol = false;
  if (selectedCell) {
    isCellDirectlySelected =
      selectedCell.col === coords.col && selectedCell.row === coords.row;
    isCellSelectedBySubgrid =
      Math.floor(selectedCell.col / 3) === Math.floor(coords.col / 3) &&
      Math.floor(selectedCell.row / 3) === Math.floor(coords.row / 3);
    isCellSelectedByRow = selectedCell.row === coords.row;
    isCellSelectedByCol = selectedCell.col === coords.col;
  }

  const cellData = grid[coords.row][coords.col];
  const value = cellData.value;
  const error = cellData.error;

  let additionalStyles = '';
  if (previewMode) {
    additionalStyles = ' bg-transparent';
  } else if (isCorrect) {
    additionalStyles += ' bg-green-50';
  } else if (isCellDirectlySelected) {
    additionalStyles = ' bg-sky-200';
  } else if (error) {
    additionalStyles = ' bg-red-50';
  } else if (
    selectedCell &&
    typeof value === 'number' &&
    grid[selectedCell.row][selectedCell.col].value === value
  ) {
    additionalStyles = ' bg-sky-100';
  } else if (
    isCellSelectedBySubgrid ||
    isCellSelectedByRow ||
    isCellSelectedByCol
  ) {
    additionalStyles = ' bg-sky-50';
  } else {
    additionalStyles += ' bg-white';
  }

  if (error) {
    additionalStyles += ' text-red-500';
  } else if (cellData.isPredefined) {
    additionalStyles += ' text-black';
  } else {
    additionalStyles += ' text-sky-700';
  }

  if (previewMode) {
    additionalStyles += ' text-xs';
  } else {
    additionalStyles += ' text-2xl sm:text-4xl font-bold';
  }

  if (isCorrect) {
    additionalStyles += ' cursor-default';
  }

  return (
    <button
      tabIndex={
        -1
      } /* done on grid. additional improvement could be to make it screen reader friendly later */
      className={
        'flex items-center justify-center col-span-1 row-span-1 outline-none' +
        additionalStyles
      }
      onFocus={() => onClick?.(coords)}
    >
      {value}
    </button>
  );
};

export default Cell;
