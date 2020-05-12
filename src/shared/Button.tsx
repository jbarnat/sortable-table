import React from "react";
import styled from "styled-components";

const StyledButton = styled.div<{ active: boolean }>`
  padding: 1em;
  border: 1px solid purple;
  text-align: center;
  width: 10em;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "purple" : "white")};
  :hover {
    background-color: purple;
    color: white;
  }
`;

type IProps = {
  label: string;
  onClick: () => void;
  active: boolean;
};
const Button = ({ label, onClick, active }: IProps) => (
  <StyledButton onClick={onClick} active={active}>
    {label}
  </StyledButton>
);

export default Button;
