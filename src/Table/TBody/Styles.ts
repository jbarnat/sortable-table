import styled from "styled-components";

export const StyledTr = styled.tr<{ isHidden: boolean }>`
  td {
    border-bottom: 1px solid rgba(0, 0, 0, 0.8);
    color: ${(props) => (props.isHidden ? "white" : "black")};
    transition: color linear 1.2s;
  }
`;

export const StyledTd = styled.td<{ isSpecial: boolean }>`
  padding: ${(props) => (props.isSpecial ? "0em 1.5em" : "0em 1.5em")};
  text-align: ${(props) => (props.isSpecial ? "right" : "left")};
  font-weight: ${(props) => (props.isSpecial ? "bold" : "normal")};
  overflow: hidden;
  text-overflow: ellipsis;
`;
