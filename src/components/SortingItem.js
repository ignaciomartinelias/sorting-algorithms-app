import React, {useContext} from "react";
import {AppContext} from '../context/AppContext';

const SortingItem = ({ value, order }) => {

  const { distance, color} = useContext(AppContext);
  const factor = window.innerWidth < 1024 ? window.innerWidth < 420 ? 30 : 40 : 50;
  const style = {
    width: `${(value * factor) / 100}px`,
    height: `${(value * factor) / 100}px`,
    background: color,
    left: `${order * distance + distance / 2}px`
  }

  return (
    <div className='sorting-item' style={style} value={value} color={color} order={order} distance={distance}>
      <span>{value}</span>
    </div>
  );
};

export default SortingItem;
