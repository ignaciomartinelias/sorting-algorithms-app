import React, { useContext } from "react";
import styled from "styled-components";
import Slider from "@bit/campgladiator.cgui.components.atoms.slider";
import { CirclePicker } from "react-color";
import { AppContext } from "../context/AppContext";

const colors = ['#3FFBBE', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#BC5F04'];

const HeaderContainer = styled.div`
  width: 100%;
  height: 7.5vh;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-weight: 600;
    width: 30%;
  }

  .sliders-wrapper {
    width: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .slider-container {
      width: 45%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .slider-label {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 50%);
      }
    }
  }
`;

const ColorPicker = styled(CirclePicker)`
  &.disabled span {
    cursor: not-allowed;
    pointer-events: none;
    opacity: .5;
  }
`

const StyledSlider = styled(Slider)`
  width: 100%;
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

const Header = () => {
  const { color, setColor, amount, setAmount, block, speed, setSpeed } = useContext(AppContext);
  return (
    <HeaderContainer>
      <h3> Sorting Algorithms Visualizer</h3>
      <ColorPicker className={block && 'disabled'} color={color} colors={colors} onChangeComplete={(c) => setColor(c.hex)} />
      <div className='sliders-wrapper'>
        <div className='slider-container'>
          <span className='slider-label'>Amount</span>
          <StyledSlider
            showValue={false}
            disabled={block}
            color={color}
            value={amount}
            onChange={e => setAmount(e.value)}
            min={4}
            max={30}
          />
        </div>

        <div className='slider-container'>
          <span className='slider-label'>Speed</span>
          <StyledSlider
            showValue={false}
            disabled={block}
            color={color}
            value={speed}
            onChange={e => setSpeed(e.value)}
            min={0}
            max={400}
          />
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
