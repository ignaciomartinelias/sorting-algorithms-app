import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SortingItem from "./SortingItem";
import Header from "./Header";
import ToolBar from "./ToolBar";
import { sortArray } from "../sortingAlgorithms/sortingAlgorithms";
import RiseLoader from "@bit/davidhu2000.react-spinners.rise-loader";

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
  const [array, setArray] = useState([]);
  const [amount, setAmount] = useState(15);
  const [block, setBlock] = useState(false);
  const [distance, setDistance] = useState(0);
  const [color, setColor] = useState("#00FFCD");
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const resetArray = () => {
    const set = new Set();
    const max = amount <= 10 ? 100 : amount <= 20 ? 75 : 50;
    while (set.size !== amount) {
      set.add(randomIntFromInterval(20, max));
    }
    setArray(Array.from(set));
    setBlock(false);
    const items = Array.from(document.querySelectorAll(".sorting-item"));
    items.forEach(el => el.classList.remove("done"));
  };

  const resetDistance = () => {
    setDistance((document.documentElement.clientWidth - 100) / amount);
  };

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  useEffect(() => {
    setLoading(true);
    resetArray();
    resetDistance();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [amount]);

  useEffect(() => {
    window.addEventListener("resize", resetDistance);
    resetDistance();
    return () => window.removeEventListener("resize", resetDistance);
  }, []);

  useEffect(() => {
    if (finished) {
      const items = Array.from(document.querySelectorAll(".sorting-item"));
      sortArray(items);
      items.forEach((el, i) => {
        const an = el.animate([{ top: "50%" }, { top: "0%" }, { top: "50%" }], {
          duration: 250,
          iterations: 1,
          fill: "forwards",
          delay: i * 100,
          easing: "ease",
        });
        an.play();
        an.finished.then(() => el.classList.remove('done'))
      });
    }
  }, [finished]);

  return (
    <>
      <Header
        resetArray={resetArray}
        color={color}
        setColor={setColor}
        amount={amount}
        setAmount={setAmount}
        block={block}
        finished={finished}
        setFinished={setFinished}
      />
      <MainWrapper>
        {loading ? (
          <RiseLoader size={25} color={color} />
        ) : (
          <ItemsContainer className='items-container'>
            {array.map((el, i) => (
              <SortingItem key={i} value={el} color={color} order={i} distance={distance} finished={finished} />
            ))}
          </ItemsContainer>
        )}
      </MainWrapper>
      <ToolBar
        block={block}
        setBlock={setBlock}
        loading={loading}
        finished={finished}
        setFinished={setFinished}
        resetArray={resetArray}
        amount={amount}
      />
    </>
  );
};

export default SortingVisualizer;
