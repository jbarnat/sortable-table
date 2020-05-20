import React, { useState, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import debounce from "lodash/debounce";
import Tbody from "./TBody";
import Thead from "./THead";

import { moveItemWithinArray, sleep } from "shared/typescript";
import { TableDataSet, Column, SortState, SortDirection } from "./types";
import { StyledTable } from "./Styles";

type TableProps = {
  tableData: TableDataSet<Column>;
};
const initialSortState = {
  columnId: -1,
  sortOrder: SortDirection.ASC,
};
const stopAnimationAfterNrows = 10;
const specialColumnMoveDelay = 200;

const Table = ({ tableData }: TableProps) => {
  const [state, setState] = useState({
    columns: tableData.columns,
    rows: tableData.rows,
    specialColumnIndex: tableData.columns.length - 1,
  });
  const [sortState, setSortState] = useState<SortState>(initialSortState);
  const [animationStep, setAnimationStep] = useState(stopAnimationAfterNrows);
  const [lastRowElement, setLastRowElement] = useState<HTMLTableRowElement | null>(null);

  // reset component on props change
  useEffect(() => {
    setState({
      columns: cloneDeep(tableData.columns),
      rows: cloneDeep(tableData.rows),
      specialColumnIndex: tableData.columns.length - 1,
    });
    setSortState(initialSortState);
  }, [tableData]);

  // sort table
  const handleColumnClick = (columnId: number): void => {
    setSortState((sortState) => {
      const stateClone = { ...sortState };
      if (stateClone.columnId === columnId && stateClone.sortOrder === SortDirection.ASC) {
        stateClone.sortOrder = SortDirection.DESC;
      } else {
        stateClone.sortOrder = SortDirection.ASC;
      }
      stateClone.columnId = columnId;
      return stateClone;
    });
  };
  // set new order and trigger animation
  useEffect(() => {
    if (sortState.columnId > -1) {
      setAnimationStep(0);
      setState((state) => {
        const currentIndex = state.columns.findIndex(
          (column) => column.columnId === sortState.columnId
        );
        return {
          ...state,
          rows: state.rows
            .concat()
            .sort(
              (rowA, rowB) =>
                (sortState.sortOrder === SortDirection.ASC ? 1 : -1) *
                rowA.values[currentIndex].localeCompare(rowB.values[currentIndex])
            ),
        };
      });
    }
  }, [sortState]);
  // animate
  useEffect(() => {
    async function animate() {
      await sleep(Math.round(Math.exp(11 - animationStep) / 500));
      setAnimationStep((visible) => visible + 1);
    }
    if (animationStep < Math.min(stopAnimationAfterNrows, state.rows.length)) {
      animate();
    } else {
      setAnimationStep(state.rows.length);
    }
  }, [animationStep, state]);

  // set special row position
  const moveSpecialColumn = debounce<any>(() => {
    if (lastRowElement) {
      const viewPortWidth = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      const cellBoundingRect = [...lastRowElement.querySelectorAll("th")].map((th) =>
        th.getBoundingClientRect()
      );

      const lastVisibleColumnIndex = Math.max(
        0,
        cellBoundingRect.filter((cellRect) => cellRect.right < viewPortWidth).length - 1
      );
      const specialCellWidtdh = cellBoundingRect[state.specialColumnIndex].width;
      const freeSpaceAfterLastColumn =
        viewPortWidth - cellBoundingRect[lastVisibleColumnIndex].right;
      const modify =
        state.specialColumnIndex > lastVisibleColumnIndex
          ? freeSpaceAfterLastColumn > specialCellWidtdh
            ? 1
            : 0
          : specialCellWidtdh >
            cellBoundingRect[lastVisibleColumnIndex].width + freeSpaceAfterLastColumn
          ? -1
          : 0;

      const specialCellNextIndex = lastVisibleColumnIndex + modify;
      setState(() => {
        const rowsClone = cloneDeep(state.rows);
        return {
          rows: rowsClone.map((row) => {
            row.values = moveItemWithinArray(
              row.values,
              state.specialColumnIndex,
              specialCellNextIndex
            );
            return row;
          }),
          columns: moveItemWithinArray(
            state.columns,
            state.specialColumnIndex,
            specialCellNextIndex
          ),
          specialColumnIndex: specialCellNextIndex,
        };
      });
    }
  }, specialColumnMoveDelay);
  // when table component mounted
  useEffect(() => {
    moveSpecialColumn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastRowElement]);
  // when viewport change
  useEffect(() => {
    window.addEventListener("resize", moveSpecialColumn);
    window.addEventListener("scroll", moveSpecialColumn);
    return () => {
      window.removeEventListener("resize", moveSpecialColumn);
      window.removeEventListener("scroll", moveSpecialColumn);
    };
  });

  return (
    <StyledTable>
      <Thead
        tableId={tableData.tableId}
        columns={state.columns}
        specialColumnIndex={state.specialColumnIndex}
        handleColumnClick={handleColumnClick}
        setLastRowElement={setLastRowElement}
        sortState={sortState}
      />
      <Tbody
        tableId={tableData.tableId}
        rows={state.rows}
        specialColumnIndex={state.specialColumnIndex}
        animationStep={animationStep}
      />
    </StyledTable>
  );
};

export default Table;
