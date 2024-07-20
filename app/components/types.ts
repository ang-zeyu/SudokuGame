export type GridData = {
  value: number | null;
  isPredefined: boolean;
  error?: boolean;
}[][];

// 0 indexed
export type CellCoords = {
  row: number;
  col: number;
};
