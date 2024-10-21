// https://leetcode.com/problems/counter-ii/

/** Write a function createCounter. It should accept an initial integer init. It should return an object with three functions.

The three functions are:

increment() increases the current value by 1 and then returns it.
decrement() reduces the current value by 1 and then returns it.
reset() sets the current value to init and then returns it.
**/

type Counter = {
  increment: () => number;
  decrement: () => number;
  reset: () => number;
};

function createCounter(init: number): Counter {
  let sum = init;
  const counter: Counter = {
    increment() {
      return ++sum;
    },
    decrement() {
      return --sum;
    },
    reset() {
      sum = init;
      return init;
    },
  };

  return counter;
}

export function solution2665() {
  verify(5, ["increment", "reset", "decrement"], [6, 5, 4]);
  verify(
    0,
    ["increment", "increment", "decrement", "reset", "reset"],
    [1, 2, 1, 0, 0],
  );
}

function verify(init: number, calls: string[], result: number[]) {
  const counter = createCounter(init);
  const r: number[] = [];
  calls.forEach((value) => {
    if (value === "increment") {
      r.push(counter.increment());
    } else if (value === "decrement") {
      r.push(counter.decrement());
    } else if (value === "reset") {
      r.push(counter.reset());
    }
  });

  const a1 = JSON.stringify(r);
  const a2 = JSON.stringify(result);

  console.log(
    `  ===> Verifying ${init}:${calls} gives ${result} ===> ${a1 === a2} ${a1 === a2 ? "✅" : "❌"}`,
  );
}