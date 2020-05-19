import { moveItemWithinArray } from "shared/typescript";

test("moveItemWithinArray", () => {
  const start = [0, 1, 2, 3, 4];
  expect(moveItemWithinArray(start, 0, 0)).toEqual([0, 1, 2, 3, 4]);
  expect(moveItemWithinArray(start, 1, 0)).toEqual([1, 0, 2, 3, 4]);
  expect(moveItemWithinArray(start, 2, 0)).toEqual([2, 0, 1, 3, 4]);
  expect(moveItemWithinArray(start, 4, 0)).toEqual([4, 0, 1, 2, 3]);
  expect(moveItemWithinArray(start, 0, 4)).toEqual([1, 2, 3, 4, 0]);
  expect(moveItemWithinArray(start, 0, 1)).toEqual([1, 0, 2, 3, 4]);
  expect(moveItemWithinArray(start, 4, 3)).toEqual([0, 1, 2, 4, 3]);
  expect(moveItemWithinArray(start, 4, 2)).toEqual([0, 1, 4, 2, 3]);
});
