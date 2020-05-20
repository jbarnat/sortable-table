export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export type SortState = {
  columnId: number;
  sortOrder: SortDirection;
};

export type Row = {
  rowId: number;
  values: string[];
};

export type Column = {
  columnId: number;
  width: number;
  name: string;
};

export type TableDataSet<T> = {
  tableId: number;
  tableName: string;
  columns: T[];
  rows: Row[];
  total: number;
};
