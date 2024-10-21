// https://leetcode.com/problems/can-place-flowers/description/

function canPlaceFlowers(flowerbed: number[], n: number): boolean {
  flowerbed.forEach((value, index) => {
    if (value === 0 && n > 0) {
      if (
        (flowerbed[index - 1] === 0 || flowerbed[index - 1] === undefined) &&
        (flowerbed[index + 1] === 0 || flowerbed[index + 1] === undefined)
      ) {
        flowerbed[index] = 1;
        n--;
      }
    }
  });

  return n <= 0;
}

export function solution605() {
  verify(canPlaceFlowers, [1, 0, 0, 0, 1], 1, true);
  verify(canPlaceFlowers, [1, 0, 0, 0, 1], 2, false);
  verify(canPlaceFlowers, [0, 0, 1, 0, 1], 1, true);
  verify(canPlaceFlowers, [1, 0, 0, 0, 1, 0, 0], 2, true);
}

function verify(
  func: (flowerbed: number[], n: number) => boolean,
  params1: number[],
  params2: number,
  result: boolean,
) {
  const execution = func(params1, params2);
  console.log(
    `  ===> Verifying ${params1}:${params2} gives ${result} ===> ${execution === result} ${execution === result ? "✅" : "❌"}`,
  );
}
