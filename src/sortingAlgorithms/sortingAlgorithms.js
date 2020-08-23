let abort = false;

export function setAbort(bool) {
  abort = bool;
}

function sleep(delay) {
  if (abort) {
    return null;
  }
  return new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, delay)
  );
}

function chunkArray(myArray, chunk_size) {
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray = [];
  for (index = 0; index < arrayLength; index += chunk_size) {
    let myChunk = myArray.slice(index, index + chunk_size);
    tempArray.push(myChunk);
  }
  return tempArray;
}

async function swapAnimation(el1, el2, delay) {
  if (abort) {
    return null;
  }
  return new Promise(resolve => {
    const style1 = window.getComputedStyle(el1);
    const style2 = window.getComputedStyle(el2);
    const x1 = style1.getPropertyValue("left");
    const x2 = style2.getPropertyValue("left");
    window.requestAnimationFrame(function () {
      el1.animate(
        [
          { left: x1, top: "50%" },
          { left: x1, top: "-50%" },
          { left: x2, top: "-50%" },
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
          { left: x2, top: "150%" },
          { left: x1, top: "150%" },
          { left: x1, top: "50%" },
        ],
        {
          duration: delay * 4,
          iterations: 1,
          fill: "forwards",
        }
      );
      setTimeout(() => {
        resolve();
      }, delay * 4);
    });
  });
}

async function quickSortSwapAnimation(a, b, pivot, delay) {
  if (abort) {
    return null;
  }
  a.classList.add("active");
  b !== pivot && b.classList.add("active");
  await swapAnimation(a, b, delay);
  a !== pivot && a.classList.remove("active");
  b.classList.remove("active");
  b === pivot && b.classList.add("done");
}

async function mergeSortGroupAnimation(arr, delay) {
  if (abort) {
    return null;
  }
  return new Promise(resolve => {
    arr.forEach(el => {
      window.requestAnimationFrame(function () {
        el.animate([{ top: "50%" }, { top: "-150%" }], {
          duration: delay * 4,
          iterations: 1,
          fill: "forwards",
        });
        setTimeout(() => {
          resolve();
        }, delay * 4);
      });
    });
  });
}

async function mergeSortSwapAnimation(el1, el2, delay) {
  if (abort) {
    return null;
  }
  return new Promise(resolve => {
    const style1 = window.getComputedStyle(el1);
    const style2 = window.getComputedStyle(el2);
    const x1 = style1.getPropertyValue("left");
    const x2 = style2.getPropertyValue("left");

    let animation = [];

    if (x1 === x2) {
      animation.push({ top: "-150%" }, { top: "50%" });
    } else {
      animation.push(
        { left: x2, top: "-150%" },
        { left: x2, top: "-25%" },
        { left: x1, top: "-25%" },
        { left: x1, top: "50%" }
      );
    }

    window.requestAnimationFrame(function () {
      el2.animate(animation, {
        duration: delay * 4,
        iterations: 1,
        fill: "forwards",
      });
      setTimeout(() => {
        resolve();
      }, delay * 4);
    });
  });
}

export function sortArray(arr) {
  arr.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
}

export async function selectionSort(delay) {
  let items = Array.from(document.querySelectorAll(".sorting-item"));
  sortArray(items);
  let len = items.length;
  for (let i = 0; i < len; i++) {
    let min = i;
    items[i].classList.add("active");
    for (let j = i + 1; j < len; j++) {
      if (abort) {
        return null;
      }
      items[j].classList.add("active");
      await sleep(delay);
      const value1 = Number(items[min].getAttribute("value"));
      const value2 = Number(items[j].getAttribute("value"));
      if (value1 > value2) {
        items[i].classList.remove("active");
        items[min].classList.remove("active");
        min = j;
      } else {
        items[j].classList.remove("active");
      }
    }
    if (min !== i) {
      items[min].classList.add("active");
      await swapAnimation(items[i], items[min], delay);
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
      if (abort) {
        return null;
      }
      items[j].classList.add("active");
      items[j + 1].classList.add("active");
      await sleep(delay);
      const value1 = Number(items[j].getAttribute("value"));
      const value2 = Number(items[j + 1].getAttribute("value"));
      if (value1 > value2) {
        await swapAnimation(items[j], items[j + 1], delay);
        sortArray(items);
      }
      items[j].classList.remove("active");
      items[j + 1].classList.remove("active");
    }
    items[items.length - i - 1].classList.add("done");
  }
  items[0].classList.add("done");
}

export async function quickSort(delay, arr = [], recursive = false) {
  if (arr.length === 0 && !recursive) {
    arr = Array.from(document.querySelectorAll(".sorting-item"));
  }
  if (abort) {
    return null;
  }
  sortArray(arr);
  switch (arr.length) {
    case 0:
      return null;
    case 1:
      arr[0].classList.add("done");
      return null;
    default:
      const pivot = arr[Math.floor(Math.random() * arr.length)];
      const last = arr[arr.length - 1];
      pivot.classList.add("active");
      if (pivot !== last) {
        await quickSortSwapAnimation(pivot, last, pivot, delay);
        sortArray(arr);
      }
      let exit = false;
      while (!exit) {
        await sleep(delay);
        if (abort) {
          return null;
        }
        const shortArray = arr.slice(0, arr.length - 1);
        const bigger = shortArray.find(v => v.getAttribute("value") > pivot.getAttribute("value"));
        const reversed = shortArray.reverse();
        const smaller = reversed.find(v => v.getAttribute("value") < pivot.getAttribute("value"));
        if (bigger && smaller) {
          if (arr.indexOf(bigger) < arr.indexOf(smaller)) {
            await quickSortSwapAnimation(bigger, smaller, pivot, delay);
          } else {
            await quickSortSwapAnimation(bigger, pivot, pivot, delay);
            exit = true;
          }
        } else if (bigger) {
          await quickSortSwapAnimation(bigger, pivot, pivot, delay);
          exit = true;
        } else {
          pivot.classList.remove("active");
          pivot.classList.add("done");
          exit = true;
        }
        sortArray(arr);
      }
      const leftArray = arr.slice(0, arr.indexOf(pivot));
      const rightArray = arr.slice(arr.indexOf(pivot) + 1);
      await quickSort(delay, leftArray, true);
      await quickSort(delay, rightArray, true);
      return null;
  }
}

export async function mergeSort(delay) {
  delay = delay / 2;
  const arr = Array.from(document.querySelectorAll(".sorting-item"));
  const pos = Array.from(document.querySelectorAll(".placement-item"));
  let factor = 1;
  while (factor < arr.length * 2) {
    sortArray(arr);
    const arrays = chunkArray(arr, factor);

    for (let i = 0; i < arrays.length; i = i + 2) {
      if (abort) {
        return null;
      }
      if (i + 1 < arrays.length) {
        const left = arrays[i];
        const right = arrays[i + 1];
        const times = left.length + right.length;
        left.forEach(el => el.classList.add("group-1"));
        right.forEach(el => el.classList.add("group-2"));

        await Promise.all([mergeSortGroupAnimation(left, delay), mergeSortGroupAnimation(right, delay)]);

        for (let j = 0; j < times; j++) {
          let correctArray = null;
          if (left.length > 0 && right.length > 0) {
            if (left[0].getAttribute("value") < right[0].getAttribute("value")) {
              correctArray = left;
            } else {
              correctArray = right;
            }
          } else if (left.length > 0) {
            correctArray = left;
          } else {
            correctArray = right;
          }
          await mergeSortSwapAnimation(pos[i * factor + j], correctArray[0], delay);
          correctArray[0].classList.remove("group-2");
          correctArray[0].classList.remove("group-1");
          factor * 2 >= arr.length && correctArray[0].classList.add("done");
          correctArray.shift();
          await sleep(delay);
        }
      }
    }
    factor = factor * 2;
  }
}
