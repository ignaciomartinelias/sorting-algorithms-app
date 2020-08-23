import React, {useContext} from "react";
import {AppContext} from '../context/AppContext';

const PlacementItem = ({ order }) => {

  const { distance} = useContext(AppContext);
  const style = {
    left: `${order * distance + distance / 2}px`
  }

  return (
    <div className='placement-item' style={style} order={order} distance={distance}>
    </div>
  );
};

export default PlacementItem;
