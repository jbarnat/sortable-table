import React, { useState } from "react";
import styled from "styled-components";

import Table from "./Table/";
import Button from "./shared/Button";

import { ITableDataSet, IColumn } from "./Table/types";

type IProps = {
  tables: ITableDataSet<IColumn>[];
};

const StyledAppHeader = styled.div`
  display: flex;
  > div {
    margin-left: 1em;
  }
`;

function App({ tables }: IProps) {
  const [currentTable, openTable] = useState<ITableDataSet<IColumn>>(tables[0]);
  return (
    <div className="App">
      <StyledAppHeader className="App-header">
        {tables.map((tableData) => (
          <Button
            key={tableData.tableId}
            onClick={() => openTable(tableData)}
            label={tableData.tableName}
            active={currentTable === tableData}
          />
        ))}
      </StyledAppHeader>
      <section>
        <Table tableData={currentTable} />
      </section>
    </div>
  );
}

export default App;
