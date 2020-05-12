import React from "react";
import { IColumn, ISortState, ISortDirection } from "./types";
import { StyledTh, StyledTHeadTr, StyledSortDirection } from "./Styles";

type IPropsTHead = {
  tableId: number;
  columns: IColumn[];
  specialColumnIndex: number;
  sortState: ISortState;
  handleColumnClick: (columneId: number) => void;
  setLastRowElement: (element: HTMLTableRowElement) => void;
};

type IPropsTh = {
  columnName: string;
  width: number;
  isSpecial: boolean;
  sortDirection: ISortDirection | null;
  clickHandler: () => void;
};

const TheadCell = ({
  columnName,
  clickHandler,
  sortDirection,
  isSpecial,
  width,
}: IPropsTh) => {
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
}: IPropsTHead) => {
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
            clickHandler={() => handleColumnClick(columnIndex)}
            sortDirection={sortState.columnIndex === columnIndex ? sortState.sortOrder : null}
            width={column.width}
            isSpecial={columnIndex === specialColumnIndex}
          />
        ))}
      </StyledTHeadTr>
    </thead>
  );
};

export default Thead;
