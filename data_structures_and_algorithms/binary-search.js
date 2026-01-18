/**
 * Performs binary search to find the index of a target value in a sorted array.
 *
 * Binary search works by repeatedly dividing the search interval in half. If the value
 * of the search key is less than the item in the middle of the interval, narrow the interval
 * to the lower half. Otherwise, narrow it to the upper half. Repeat until the value is found
 * or the interval is empty.
 *
 * Time Complexity: O(log n), where n is the number of elements in the array.
 * Space Complexity: O(1).
 *
 * @param {number[]} arr - The sorted array to search through.
 * @param {number} target - The value to search for.
 * @returns {number} The index of the target if found; otherwise, -1.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const idx = binarySearch(arr, 3); // idx is 2
 */
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

// Example usage:
const sortedArray = [1, 3, 5, 7, 9, 11, 13];
const target = 7;
const index = binarySearch(sortedArray, target);
console.log(`Index of ${target}:`, index); // Output: Index of 7: 3
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
