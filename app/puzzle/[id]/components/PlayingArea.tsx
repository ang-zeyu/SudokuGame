'use client'

import Grid from "@/app/puzzle/[id]/components/Grid";
import { oneToNine } from "@/app/puzzle/[id]/components/constants";
import {KeyboardEventHandler, useMemo, useState} from "react";
import type {CellCoords, GridData} from "@/app/puzzle/[id]/components/types";
import ResetButton from "@/app/puzzle/[id]/components/topButtons/ResetButton";
import NextButton from "@/app/puzzle/[id]/components/topButtons/NextButton";
import HomeButton from "@/app/puzzle/[id]/components/topButtons/HomeButton";
import NumberButton from "@/app/puzzle/[id]/components/bottomButtons/NumberButton";
import EraseButton from "@/app/puzzle/[id]/components/bottomButtons/EraseButton";
import { cloneGridWoErrors, setGridErrors } from "@/app/puzzle/[id]/components/utils";

const PlayingArea: React.FC<{
  initialGrid: GridData;
  nextId?: string;
}> = ({ initialGrid, nextId }) => {
  const [selectedCell, setSelectedCell] = useState<CellCoords | null>(null);
  const [grid, setGrid] = useState<GridData>(initialGrid);

  const setGridValue = (num: number | null) => setGrid((oldGrid) => {
    if (!oldGrid || !selectedCell || oldGrid[selectedCell.row][selectedCell.col].isPredefined) {
      return oldGrid;
    }

    const newGrid = cloneGridWoErrors(oldGrid);
    newGrid[selectedCell.row][selectedCell.col] = {
      value: num,
      isPredefined: false,
    }

    setGridErrors(newGrid);

    return newGrid;
  });

  const isCorrect = useMemo(() => {
    return grid.every(row => row.every((cell) => cell.value !== null && !cell.error));
  }, [grid])

  const isEditableCellSelected = selectedCell ? !grid[selectedCell.row][selectedCell.col].isPredefined : false;

  const isErasable = !isCorrect
    && isEditableCellSelected
    && selectedCell
    && grid[selectedCell.row][selectedCell.col].value !== null;

  const onKeyDown: KeyboardEventHandler = (ev) => {
    const asNumber = Number(ev.key);

    if (oneToNine.includes(asNumber)) {
      setGridValue(asNumber);
      ev.stopPropagation();
      ev.preventDefault();
    } else if (['Delete', 'Backspace'].includes(ev.key)) {
      setGridValue(null);
      ev.stopPropagation();
      ev.preventDefault();
    }

    let rowOffset = 0;
    let colOffset = 0;
    if (ev.key === 'ArrowUp') {
      rowOffset = -1;
    } else if (ev.key === 'ArrowDown') {
      rowOffset = 1;
    } else if (ev.key === 'ArrowLeft') {
      colOffset = -1;
    } else if (ev.key === 'ArrowRight') {
      colOffset = 1;
    }

    if (rowOffset || colOffset) {
      setSelectedCell((selectedCell) => {
        if (!selectedCell) {
          return { row: 0, col: 0 };
        }

        const newRow = (rowOffset + (selectedCell.row ?? 0)) % 9;
        const newCol = (colOffset + (selectedCell.col ?? 0)) % 9;
        return {
          row: newRow < 0 ? (9 + newRow) : newRow,
          col: newCol < 0 ? (9 + newCol) : newCol,
        };
      })
      ev.stopPropagation();
      ev.preventDefault();
    }
  };
  const onReset = () => {
    setSelectedCell(null);
    setGrid(initialGrid);
  };
  const onErase = () => setGridValue(null);
  const onNumberButtonClick = (num: number) => setGridValue(num);

  return <>
    <header className="flex-1 flex flex-wrap items-center gap-6 mb-8">
      <h2 className="text-4xl font-bold mr-auto">Sudoku</h2>
      <div className="flex flex-wrap gap-2">
        <ResetButton onClick={onReset}/>
        {nextId && <NextButton nextId={nextId}/>}
        <HomeButton/>
      </div>
    </header>

    <main>
      <div onKeyDown={onKeyDown} tabIndex={0}>
        <Grid
          grid={grid}
          isCorrect={isCorrect}
          onCellClick={setSelectedCell}
          selectedCell={isCorrect ? null : selectedCell}
        />
      </div>

      <div className="flex mt-5">
        <div className="flex gap-2 flex-wrap mr-auto">
          {
            oneToNine.map((num) => <NumberButton
              key={num}
              num={num}
              isEditableCellSelected={!isCorrect && isEditableCellSelected}
              onClick={onNumberButtonClick}
            />)
          }
        </div>
        <EraseButton erasable={isErasable} onClick={onErase} />
      </div>
    </main>
  </>;
}

export default PlayingArea;
