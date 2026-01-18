/**
 * Sorts an array of numbers in ascending order using the bubble sort algorithm.
 *
 * Bubble sort repeatedly steps through the list, compares adjacent elements,
 * and swaps them if they are in the wrong order. This process is repeated
 * until the array is sorted. The algorithm gets its name because smaller
 * elements "bubble" to the top of the list with each iteration.
 *
 * Time Complexity: O(n^2) in the worst and average case, where n is the number of elements.
 * Space Complexity: O(1) (in-place sort).
 *
 * @param {number[]} arr - The array of numbers to sort. The array is sorted in place.
 * @returns {number[]} The sorted array (same reference as input).
 *
 * @example
 * const nums = [3, 1, 4, 1, 5];
 * bubbleSort(nums); // nums is now [1, 1, 3, 4, 5]
 */
function bubbleSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap arr[j] and arr[j + 1]
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// Example usage:
const array = [5, 2, 9, 1, 5, 6];
console.log("Sorted:", bubbleSort(array)); // Output: Sorted: [1, 2, 5, 5, 6, 9]
