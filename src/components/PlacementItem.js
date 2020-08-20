import React, {useContext} from "react";
import styled from "styled-components";
import {AppContext} from '../context/AppContext';

const CircleWrapper = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  background: transparent;
  top: 50%;
  transform: translate(-50%, -50%);
  left: ${props => props.order * props.distance + props.distance / 2}px;
`;

const PlacementItem = ({ order }) => {

  const { distance} = useContext(AppContext);
  return (
    <CircleWrapper className='placement-item' order={order} distance={distance}>
    </CircleWrapper>
  );
};

export default PlacementItem;
