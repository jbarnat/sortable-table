import React from "react";
import { Column, SortState, SortDirection } from "Table/types";
import { StyledTh, StyledTHeadTr, StyledSortDirection } from "./Styles";

type TheadProps = {
  tableId: number;
  columns: Column[];
  specialColumnIndex: number;
  sortState: SortState;
  handleColumnClick: (columneId: number) => void;
  setLastRowElement: (element: HTMLTableRowElement) => void;
};

type TheadCellProps = {
  columnName: string;
  width: number;
  isSpecial: boolean;
  sortDirection: SortDirection | null;
  clickHandler: () => void;
};

const TheadCell = ({
  columnName,
  clickHandler,
  sortDirection,
  isSpecial,
  width,
}: TheadCellProps) => {
  return (
    <StyledTh sortDirection={sortDirection} onClick={clickHandler} isSpecial={isSpecial} width={width}>
      {columnName}
      <StyledSortDirection>{sortDirection}</StyledSortDirection>
    </StyledTh>
  );
};

const Thead = ({
  columns,
  handleColumnClick,
  specialColumnIndex,
  setLastRowElement,
  tableId,
  sortState,
}: TheadProps) => {
  return (
    <thead>
      <StyledTHeadTr
        key={`Thead-${tableId}`}
        ref={(element) => element && setLastRowElement(element)}
      >
        {columns.map((column, columnIndex) => (
          <TheadCell
            key={`${tableId}-${column.columnId}}`}
            columnName={column.name}
            clickHandler={() => handleColumnClick(column.columnId)}
            sortDirection={sortState.columnId === column.columnId ? sortState.sortOrder : null}
            width={column.width}
            isSpecial={columnIndex === specialColumnIndex}
          />
        ))}
      </StyledTHeadTr>
    </thead>
  );
};

export default Thead;
