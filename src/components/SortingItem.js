import React, {useContext} from "react";
import styled from "styled-components";
import {AppContext} from '../context/AppContext';

const CircleWrapper = styled.div`
  position: absolute;
  width: ${props => (props.value * 50) / 100}px;
  height: ${props => (props.value * 50) / 100}px;
  background: ${props => props.color};
  border-radius: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  left: ${props => props.order * props.distance + props.distance / 2}px;
  transition: 0.2s all ease;

  &.active {
    background: #232528;
  }
  &.group-1 {
    background: #D65EFF;
  }
  &.group-2 {
    background: #F3FF5E;
  }
  &.done {
    background: #d81e5b;
  }

  span {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: .8em;
  }
`;

const SortingItem = ({ value, order }) => {

  const { distance, color} = useContext(AppContext);

  return (
    <CircleWrapper className='sorting-item' value={value} color={color} order={order} distance={distance}>
      <span>{value}</span>
    </CircleWrapper>
  );
};

export default SortingItem;
