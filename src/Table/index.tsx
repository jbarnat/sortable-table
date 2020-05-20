import React from "react";
import Table from "./Table";
import { StyledTableContainer } from "./Styles";
import { TableDataSet, Column } from "./types";

type TableContainerProps = {
  tableData: TableDataSet<Column>;
};

const TableContainer = ({ tableData }: TableContainerProps) => {
  return (
    <div>
      {!tableData && <p>no table set</p>}
      {!!tableData && (
        <StyledTableContainer>
          <Table tableData={tableData} />
        </StyledTableContainer>
      )}
    </div>
  );
};

export default TableContainer;
