import React, { useContext } from "react";
import { bubbleSort, selectionSort, quickSort, mergeSort, setAbort } from "../sortingAlgorithms/sortingAlgorithms";
import { AppContext } from "../context/AppContext";

const ToolBar = () => {
  const { block, setBlock, loading, finished, setFinished, resetArray, speed, setAmount, amount } = useContext(
    AppContext
  );

  const sort = async (type, mobile = false) => {
    setAbort(false);
    if (finished) {
      setFinished(false);
      resetArray();
    }
    const regulatedSpeed = 440 - speed;
    setBlock(true);
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
    setBlock(false);
    setFinished(true);
  };

  const stopSort = () => {
    setAbort(true);
    let a = amount;
    setAmount(0);
    setTimeout(() => setAmount(a), 1000);
  };

  return (
    <div className='ToolBar'>
      <select name='algorithms' className='algorithm-select' disabled={block} value={block && ''} onChange={(e) => sort(e.target.value, true)}>
        <option value=''>Please choose an algorithm</option>
        <option value='selection'>Selection Sort</option>
        <option value='bubble'>Bubble Sort</option>
        <option value='quick'>Quick Sort</option>
        <option value='merge'>Merge Sort</option>
      </select>
      <button className='action-button' onClick={resetArray} disabled={block}>
        Generate New Array
      </button>
      <button className='algorithm-button' disabled={block || loading} onClick={() => sort("selection")}>
        Selection Sort
      </button>
      <button className='algorithm-button' disabled={block || loading} onClick={() => sort("bubble")}>
        Bubble Sort
      </button>
      <button className='algorithm-button' disabled={block || loading} onClick={() => sort("quick")}>
        Quick Sort
      </button>
      <button className='algorithm-button' disabled={block || loading} onClick={() => sort("merge")}>
        Merge Sort
      </button>
      <button className='action-button' onClick={stopSort} disabled={!block}>
        Stop Animation
      </button>
    </div>
  );
};

export default ToolBar;
