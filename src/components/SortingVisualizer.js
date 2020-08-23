import React, { useContext } from "react";
import SortingItem from "./SortingItem";
import PlacementItem from "./PlacementItem";
import Header from "./Header";
import ToolBar from "./ToolBar";
import RiseLoader from "@bit/davidhu2000.react-spinners.rise-loader";
import { AppContext } from "../context/AppContext";

const SortingVisualizer = () => {
  const { loading, color, array } = useContext(AppContext);

  return (
    <>
      <Header />
      <div className="MainWrapper">
        {loading ? (
          <RiseLoader size={25} color={color} />
        ) : (
          <div className='items-container'>
            {array.map((el, i) => (
              [
              <SortingItem key={'sorting-item-' + i} value={el} order={i} />,
              <PlacementItem key={'placement-item-' + i} order={i} />
              ]
            ))}
          </div>
        )}
      </div>
      <ToolBar />
    </>
  );
};

export default SortingVisualizer;
