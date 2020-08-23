import React, { createContext, useState, useEffect } from "react";
import { sortArray } from "../sortingAlgorithms/sortingAlgorithms";

export const AppContext = createContext({});

export const AppProvider = props => {

  const initAmount = window.innerWidth < 1024 ? window.innerWidth < 420 ? 6 : 10 : 16;
  const [array, setArray] = useState([]);
  const [amount, setAmount] = useState(initAmount);
  const [block, setBlock] = useState(false);
  const [distance, setDistance] = useState(0);
  const [color, setColor] = useState("#3FFBBE");
  const [speed, setSpeed] = useState(250);
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
    const padding = window.innerWidth < 1024 ? window.innerWidth < 420 ? 40 : 60 : 100;
    setDistance((document.documentElement.clientWidth - padding) / amount);
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
        an.finished.then(() => el.classList.remove("done"));
      });
    }
  }, [finished]);

  return (
    <AppContext.Provider
      value={{
        array,
        setArray,
        amount,
        setAmount,
        block,
        setBlock,
        distance,
        setDistance,
        color,
        setColor,
        loading,
        setLoading,
        finished,
        setFinished,
        resetArray,
        speed,
        setSpeed
      }}>
      {props.children}
    </AppContext.Provider>
  );
};
