export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const moveItemWithinArray: <T>(
  arr: T[],
  currentIndex: number,
  newIndex: number
) => T[] = (arr, currentIndex, newIndex) => {
  const arrClone = [...arr];
  arrClone.splice(newIndex, 0, arrClone.splice(currentIndex, 1)[0]);
  return arrClone;
};
