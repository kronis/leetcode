// https://leetcode.com/problems/remove-one-element-to-make-the-array-strictly-increasing/description/

function canBeIncreasing(nums: number[]): boolean {
  if (nums.length === 2) return true;

  let result = false;
  //   console.log(nums);
  nums.forEach((value: number, index: number, array: number[]) => {
    const newArray = array.slice();
    newArray.splice(index, 1);
    // console.log("Remove index " + index + " = " + newArray);

    const sortedArray = newArray.slice().sort((a, b) => a - b);
    // console.log(newArray);
    // console.log(sortedArray);

    let allTrue = true;
    newArray.forEach((v, i) => {
      //   console.log("Checking " + v + " === " + sortedArray[i]);
      if (v === sortedArray[i]) {
        // console.log( `v ${v} > ${sortedArray[i - 1]} = ${v > sortedArray[i - 1]}`,);
        if (v > sortedArray[i - 1]) {
          //   console.log("true");
        } else {
          if (sortedArray[i - 1]) {
            allTrue = false;
          }
        }
      } else {
        // console.log("false");
        allTrue = false;
      }
    });

    if (allTrue === true) {
      result = true;
    }
  });

  //   const numsSorted = Array.from(nums);
  //   numsSorted.sort((a, b) => a - b);
  //   console.log("nums: " + nums);
  //   console.log("numsSorted: " + numsSorted);

  //   let returnValue = true;
  //   let diff = 0;

  //   for (let i = 0; i < nums.length; i++) {
  //     if (nums[i] !== numsSorted[i]) {
  //       returnValue = false;
  //     }
  //   }

  return result;
}

export function solution1909() {
  verify(canBeIncreasing, [1, 2, 10, 5, 7], true);
  verify(canBeIncreasing, [2, 3, 1, 2], false);
  verify(canBeIncreasing, [1, 1, 1], false);
  verify(canBeIncreasing, [100, 21, 3], false);
}

function verify(
  func: (nums: number[]) => boolean,
  params: number[],
  result: boolean,
) {
  const execution = func(params);
  console.log(
    `  ===> Verifying ${params} gives ${result} ===> ${execution === result} ${execution === result ? "✅" : "❌"}`,
  );
}
