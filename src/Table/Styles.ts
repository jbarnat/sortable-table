import styled from "styled-components";
import { ISortDirection } from "./types";

// TABLE
export const StyledTableContainer = styled.div`
  display: inline-block;
  padding-right: 10em;
`;
export const StyledTable = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  margin: 1em;
`;

// THEAD
export const StyledTHeadTr = styled.tr`
  height: 3em;
`;

export const StyledTh = styled.th<{
  sortDirection: ISortDirection | null;
  isSpecial: boolean;
  width: number;
}>`
  width: ${(props) => `${Math.round(props.width)}em`};
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  border-bottom: 3px solid purple;
  padding: 0em 1.9em;
  color: ${(props) =>
    props.sortDirection === ISortDirection.ASC
      ? "blue"
      : props.sortDirection === ISortDirection.DESC
      ? "red"
      : "black"};
  :hover {
    border-bottom: 3px solid white;
  }
  background-color: ${(props) => (props.isSpecial ? "pink" : "white")};
`;

export const StyledSortDirection = styled.span`
  font-size: 0.7em;
  padding-left: 0.3em;
  font-family: "Courier New", Courier, monospace;
  color: gray;
`;

// TBODY
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
