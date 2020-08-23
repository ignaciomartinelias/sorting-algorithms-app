import React, { useContext, useState } from "react";
import styled from "styled-components";
import Slider from "@bit/campgladiator.cgui.components.atoms.slider";
import { CirclePicker } from "react-color";
import { AppContext } from "../context/AppContext";
import BurgerMenu from "../burger-menu.svg";
import Close from "../close.svg";

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

const colors = ["#3FFBBE", "#F47373", "#697689", "#37D67A", "#2CCCE4", "#BC5F04"];

const Header = () => {
  const { color, setColor, amount, setAmount, block, speed, setSpeed } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const max = window.innerWidth < 1024 ? window.innerWidth < 420 ? 8 : 16 : 30;
  return (
    <div className='Header'>
      <h3> Sorting Algorithms Visualizer</h3>
      <CirclePicker
        className={!block ? "ColorPicker" : "ColorPicker disabled"}
        color={color}
        colors={colors}
        onChangeComplete={c => setColor(c.hex)}
      />
      <div className='sliders-wrapper'>
        <div className='slider-container'>
          <span className='slider-label'>Amount</span>
          <StyledSlider
            className='Slider'
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
            className='Slider'
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
      <div className='burger-menu' onClick={() => setOpen(true)}>
        <img src={BurgerMenu} alt='Menu' />
      </div>
      <div className={open ? "side-menu-container open" : "side-menu-container"}>
        <div className={open ? "side-menu open" : "side-menu"}>
          <div className='close' onClick={() => setOpen(false)}>
            <img src={Close} alt='close' />
          </div>
          <div className='menu-container'>
            <div className='menu-item'>
              <span>Amount</span>
              <StyledSlider
                className='Slider'
                showValue={false}
                disabled={block}
                color={color}
                value={amount}
                onChange={e => setAmount(e.value)}
                min={4}
                max={max}
              />
            </div>
            <div className='menu-item'>
              <span>Speed</span>
              <StyledSlider
                className='Slider'
                showValue={false}
                disabled={block}
                color={color}
                value={speed}
                onChange={e => setSpeed(e.value)}
                min={0}
                max={400}
              />
            </div>
            <div className='menu-item'>
              <span>Color</span>
              <CirclePicker
                className={!block ? "ColorPicker" : "ColorPicker disabled"}
                color={color}
                colors={colors}
                onChangeComplete={c => setColor(c.hex)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
