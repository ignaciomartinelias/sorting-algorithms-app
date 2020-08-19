import React from "react";
import styled from "styled-components";
import { bubbleSort, selectionSort, quickSort, sortArray } from "../sortingAlgorithms/sortingAlgorithms";

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

  // const checkIfCorrect = () => {
  //   const items = Array.from(document.querySelectorAll(".sorting-item"));
  //   sortArray(items);
  //   let isCorrect = true;
  //   for(let i=0;i<items.length - 1;i++) {
  //     if(items[i].getAttribute('value') > items[i + 1].getAttribute('value')) {
  //       isCorrect = false;
  //     }
  //   }
  //   return isCorrect
  // }

  // const testQuick = async () => {
  //   for(let i=0;i<100;i++) {
  //     await quickSort([],0);
  //     console.log(checkIfCorrect());
  //     resetArray();
  //   }
  // }

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

      {/* <AlgorithmButton onClick={testQuick}>
        Quick Sort
      </AlgorithmButton> */}
    </ToolBarContainer>
  );
};

export default ToolBar;
