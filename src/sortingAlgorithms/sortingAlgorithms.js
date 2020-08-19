function sleep(delay) {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, delay)
  );
}

export function sortArray(arr) {
  arr.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
}

function swap(el1, el2, delay) {
  const container = document.querySelector(".items-container");
  return new Promise(resolve => {
    const style1 = window.getComputedStyle(el1);
    const style2 = window.getComputedStyle(el2);
    const x1 = style1.getPropertyValue("left");
    const x2 = style2.getPropertyValue("left");
    window.requestAnimationFrame(function () {
      el1.animate(
        [
          { left: x1, top: "50%" },
          { left: x1, top: "0%" },
          { left: x2, top: "0%" },
          { left: x2, top: "50%" },
        ],
        {
          duration: delay * 4,
          iterations: 1,
          fill: "forwards",
        }
      );
      el2.animate(
        [
          { left: x2, top: "50%" },
          { left: x2, top: "100%" },
          { left: x1, top: "100%" },
          { left: x1, top: "50%" },
        ],
        {
          duration: delay * 4,
          iterations: 1,
          fill: "forwards",
        }
      );
      setTimeout(() => {
        container.insertBefore(el2, el1);
        resolve();
      }, delay * 4);
    });
  });
}

export async function selectionSort(delay) {
  let items = Array.from(document.querySelectorAll(".sorting-item"));
  sortArray(items);
  let len = items.length;
  for (let i = 0; i < len; i++) {
    items[i].classList.add("active");
    let min = i;
    for (let j = i + 1; j < len; j++) {
      items[j].classList.add("active");
      await sleep(delay);
      const value1 = Number(items[min].getAttribute("value"));
      const value2 = Number(items[j].getAttribute("value"));
      if (value1 > value2) {
        min = j;
      }
      items[j].classList.remove("active");
    }
    if (min !== i) {
      items[min].classList.add("active");
      await swap(items[i], items[min], delay);
      items[min].classList.remove("active");
    }
    items[i].classList.remove("active");
    items[min].classList.add("done");

    sortArray(items);
  }
}

export async function bubbleSort(delay) {
  let items = Array.from(document.querySelectorAll(".sorting-item"));
  sortArray(items);
  for (let i = 0; i < items.length - 1; i++) {
    for (let j = 0; j < items.length - i - 1; j++) {
      items[j].classList.add("active");
      items[j + 1].classList.add("active");
      await sleep(delay);
      const value1 = Number(items[j].getAttribute("value"));
      const value2 = Number(items[j + 1].getAttribute("value"));
      if (value1 > value2) {
        await swap(items[j], items[j + 1], delay);
        sortArray(items);
      }
      items[j].classList.remove("active");
      items[j + 1].classList.remove("active");
    }
    items[items.length - i - 1].classList.add("done");
  }
  items[0].classList.add("done");
}

export async function quickSort(arr, delay) {
  let items = arr;
  let finished = false;
  if (items.length === 0) {
    items = Array.from(document.querySelectorAll(".sorting-item"));
  }
  sortArray(items);
  const pivot = items[Math.floor(Math.random() * items.length)];
  const pivotOriginalindex = items.indexOf(pivot);
  
  if(pivot !== items[items.length - 1]) {
    pivot.classList.add("active");
    items[items.length - 1].classList.add("active");
    await swap(pivot, items[items.length - 1], delay);
    pivot.classList.remove("active");
    items[items.length - 1].classList.remove("active");
    sortArray(items);
  }

  let foundTwo = true;
  let goodPivot = true;
  if (items.length === 2) {
    await sleep(delay);
    items[0].classList.add("active");
    items[1].classList.add("active");
    if (items[0].getAttribute("value") > items[1].getAttribute("value")) {
      await swap(items[0], items[1], delay);
    }
    items[0].classList.remove("active");
    items[1].classList.remove("active");
    items[0].classList.add("done");
    items[1].classList.add("done");
    finished = true;
  } else {
    while (foundTwo && goodPivot) {
      await sleep(delay);
      const shortArray = items.slice(0, items.length - 1);
      const bigger = shortArray.find(v => v.getAttribute("value") > pivot.getAttribute("value"));
      const reversed = shortArray.reverse();
      const smaller = reversed.find(v => v.getAttribute("value") < pivot.getAttribute("value"));
      if (!smaller || !bigger) {
        if(pivot !== items[pivotOriginalindex]) {
          pivot.classList.add("active");
          items[pivotOriginalindex].classList.add("active");
          await swap(pivot, items[pivotOriginalindex], delay);
          pivot.classList.remove("active");
          items[pivotOriginalindex].classList.remove("active");
        }
        goodPivot = false;
      } else if (items.indexOf(smaller) > items.indexOf(bigger)) {
        smaller.classList.add("active");
        bigger.classList.add("active");
        await swap(bigger, smaller, delay);
        smaller.classList.remove("active");
        bigger.classList.remove("active");
      } else {
        pivot.classList.add("active");
        bigger.classList.add("active");
        await swap(bigger, pivot, delay);
        pivot.classList.remove("active");
        bigger.classList.remove("active");
        pivot.classList.add("done");
        foundTwo = false;
      }
      sortArray(items);
    }
  }
  if (!goodPivot) {
    await quickSort(items, delay);
  } else if (finished) {
    return null;
  } else {
    const leftArray = items.slice(0, items.indexOf(pivot));
    const rightArray = items.slice(items.indexOf(pivot) + 1);
    if (leftArray.length === 1) {
      leftArray[0].classList.add("done");
    } else {
      await quickSort(leftArray, delay);
    }
    if (rightArray.length === 1) {
      rightArray[0].classList.add("done");
    } else {
      await quickSort(rightArray, delay);
    }
  }
}
