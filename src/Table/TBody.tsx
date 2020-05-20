import React from "react";
import { StyledTd, StyledTr } from "./Styles";

import { Row } from "./types";


type TbodyProps = {
  rows: Row[];
  specialColumnIndex: number;
  tableId: number;
  animationStep: number;
};

const Tbody = ({ rows, specialColumnIndex, tableId, animationStep }: TbodyProps) => {
  return (
    <tbody>
      {rows.map((row, rowIndex) => (
        <StyledTr key={`${tableId}-${row.rowId}}`} isHidden={rowIndex >= animationStep}>
          {row.values.map((value, i) => (
            <StyledTd key={i} isSpecial={i === specialColumnIndex}>
              {value}
            </StyledTd>
          ))}
        </StyledTr>
      ))}
    </tbody>
  );
};
export default Tbody;
