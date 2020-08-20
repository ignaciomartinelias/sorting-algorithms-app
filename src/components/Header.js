import React, {useContext} from "react";
import styled from "styled-components";
import Slider from "@bit/campgladiator.cgui.components.atoms.slider";
import { AppContext } from "../context/AppContext";

const HeaderContainer = styled.div`
  width: 100%;
  height: 7.5vh;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-weight: 600;
  }
`;

const AmountSlider = styled(Slider)`
  width: 40%;
  span {
    background-color: ${props => props.color} !important;
    cursor: pointer;
  }
  div {
    font-family: Montserrat !important;
  }
  &.cg-slider--disabled,
  &.cg-slider--disabled span {
    cursor: not-allowed;
  }
`;

const ActionButton = styled.button`
  background: black;
  padding: 10px 20px;
  color: white;
  border: none;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.75;
  }
  &:focus {
    outline: none;
  }
  &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

const Header = () => {
  const { resetArray, color, setColor, amount, setAmount, block } = useContext(AppContext);
  return (
    <HeaderContainer>
      <h3> Sorting Algorithms Visualizer</h3>
      <AmountSlider disabled={block} color={color} value={amount} onChange={e => setAmount(e.value)} min={5} max={30} />
      <ActionButton onClick={resetArray} disabled={block}>Generate New Array</ActionButton>
    </HeaderContainer>
  );
};

export default Header;
