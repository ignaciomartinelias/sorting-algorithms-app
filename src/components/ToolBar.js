import React from "react";
import styled from "styled-components";
import { bubbleSort, selectionSort, quickSort } from "../sortingAlgorithms/sortingAlgorithms";

const ToolBarContainer = styled.div`
  width: 100%;
  height: 22.5vh;
  padding: 0 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
`;

const AlgorithmButton = styled.button`
  background: transparent;
  border: solid 1px black;
  padding: 10px 20px;
  color: black;
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

const ToolBar = ({ block, setBlock, loading, finished, setFinished, resetArray, amount }) => {

  const sort = async type => {
    if(finished) {
        setFinished(false);
        resetArray();
    }
    const speed = 1000 / amount;
    setBlock(true);
    switch (type) {
      case "selection":
        await selectionSort(speed);
        break;
      case "bubble":
        await bubbleSort(speed);
        break;
      case "quick":
        await quickSort([], speed);
        break;
      default:
        return null;
    }
    setBlock(false);
    setFinished(true);
  };

  return (
    <ToolBarContainer>
      <AlgorithmButton disabled={block || loading} onClick={() => sort("selection")}>
        Selection Sort
      </AlgorithmButton>
      <AlgorithmButton disabled={block || loading} onClick={() => sort("bubble")}>
        Bubble Sort
      </AlgorithmButton>
      <AlgorithmButton disabled={block || loading} onClick={() => sort("quick")}>
        Quick Sort
      </AlgorithmButton>
    </ToolBarContainer>
  );
};

export default ToolBar;
