import React, { useContext } from "react";
import styled from "styled-components";
import {
  bubbleSort,
  selectionSort,
  quickSort,
  mergeSort,
  sortArray,
  stop,
  resume,
} from "../sortingAlgorithms/sortingAlgorithms";
import { AppContext } from "../context/AppContext";

const ToolBarContainer = styled.div`
  width: 100%;
  height: 22.5vh;
  padding: 0 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
`;

const ActionButton = styled.button`
  background: black;
  padding: 10px 20px;
  color: white;
  border: none;
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

const ToolBar = () => {
  const { block, setBlock, loading, finished, setFinished, resetArray, speed } = useContext(AppContext);

  const sort = async type => {
    resume();
    if (finished) {
      setFinished(false);
      resetArray();
    }
    const regulatedSpeed = 440 - speed;
    setBlock(true);
    const t1 = performance.now();
    switch (type) {
      case "selection":
        await selectionSort(regulatedSpeed);
        break;
      case "bubble":
        await bubbleSort(regulatedSpeed);
        break;
      case "quick":
        await quickSort(regulatedSpeed);
        break;
      case "merge":
        await mergeSort(regulatedSpeed);
        break;
      default:
        return null;
    }
    const t2 = performance.now();
    console.log(t2 - t1);
    setBlock(false);
    setFinished(true);
  };

  const stopSort = () => {
    stop(speed);
    resetArray();
  };

  // const checkIfCorrect = () => {
  //   const items = Array.from(document.querySelectorAll(".sorting-item"));
  //   sortArray(items);
  //   let isCorrect = true;
  //   for (let i = 0; i < items.length - 1; i++) {
  //     if (items[i].getAttribute("value") > items[i + 1].getAttribute("value")) {
  //       isCorrect = false;
  //     }
  //   }
  //   return isCorrect;
  // };

  // const testQuick = async () => {
  //   for (let i = 0; i < 100; i++) {
  //     await quickSort(0);
  //     console.log(checkIfCorrect());
  //     resetArray();
  //   }
  // };

  return (
    <ToolBarContainer>
      <ActionButton onClick={resetArray} disabled={block}>
        Generate New Array
      </ActionButton>
      <AlgorithmButton disabled={block || loading} onClick={() => sort("selection")}>
        Selection Sort
      </AlgorithmButton>
      <AlgorithmButton disabled={block || loading} onClick={() => sort("bubble")}>
        Bubble Sort
      </AlgorithmButton>
      <AlgorithmButton disabled={block || loading} onClick={() => sort("quick")}>
        Quick Sort
      </AlgorithmButton>
      <AlgorithmButton disabled={block || loading} onClick={() => sort("merge")}>
        Merge Sort
      </AlgorithmButton>
      <ActionButton onClick={stopSort} disabled={!block}>
        Stop Animation
      </ActionButton>

      {/* <AlgorithmButton onClick={testQuick}>Quick Sort</AlgorithmButton> */}
    </ToolBarContainer>
  );
};

export default ToolBar;
