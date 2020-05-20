import styled from "styled-components";
import { SortDirection } from "Table/types";

export const StyledTHeadTr = styled.tr`
  height: 3em;
`;

export const StyledTh = styled.th<{
  sortDirection: SortDirection | null;
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
    props.sortDirection === SortDirection.ASC
      ? "blue"
      : props.sortDirection === SortDirection.DESC
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
