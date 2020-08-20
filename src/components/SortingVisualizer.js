import React, { useContext } from "react";
import styled from "styled-components";
import SortingItem from "./SortingItem";
import PlacementItem from "./PlacementItem";
import Header from "./Header";
import ToolBar from "./ToolBar";
import RiseLoader from "@bit/davidhu2000.react-spinners.rise-loader";
import { AppContext } from "../context/AppContext";

const MainWrapper = styled.div`
  display: flex;
  height: 70vh;
  justify-content: center;
  align-items: center;
  padding: 50px;
  width: 100%;
`;

const ItemsContainer = styled.div`
  position: relative;
  height: 50px;
  width: 100%;
`;

const SortingVisualizer = () => {
  const { loading, color, array } = useContext(AppContext);

  return (
    <>
      <Header />
      <MainWrapper>
        {loading ? (
          <RiseLoader size={25} color={color} />
        ) : (
          <ItemsContainer className='items-container'>
            {array.map((el, i) => (
              [
              <SortingItem key={'sorting-item-' + i} value={el} order={i} />,
              <PlacementItem key={'placement-item-' + i} order={i} />
              ]
            ))}
          </ItemsContainer>
        )}
      </MainWrapper>
      <ToolBar />
    </>
  );
};

export default SortingVisualizer;
