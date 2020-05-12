import React from "react";
import Table from "./Table";
import { StyledTableContainer } from "./Styles";

type IProps = {
  tableData: any;
};

const TableContainer = ({ tableData }: IProps) => {
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
