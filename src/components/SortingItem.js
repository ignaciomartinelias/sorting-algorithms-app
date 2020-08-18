import React from "react";
import styled from "styled-components";

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
  &.done {
    background: #d81e5b;
  }

  span {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;

const SortingItem = ({ value, color, order, distance }) => {
  return (
    <CircleWrapper className='sorting-item' value={value} color={color} order={order} distance={distance}>
      <span>{value}</span>
    </CircleWrapper>
  );
};

export default SortingItem;
