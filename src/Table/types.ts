export enum ISortDirection {
  ASC = "asc",
  DESC = "desc",
}

export type ISortState = {
  columnIndex: number;
  sortOrder: ISortDirection;
};

export type IRow = {
  rowId: number;
  values: string[];
};

export type IColumn = {
  columnId: number;
  width: number;
  name: string;
};

export type ITableDataSet<T> = {
  tableId: number;
  tableName: string;
  columns: T[];
  rows: IRow[];
  total: number;
};
