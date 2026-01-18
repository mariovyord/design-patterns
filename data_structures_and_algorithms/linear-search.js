const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/**
 * Performs a linear search to find the index of a target value in an array.
 *
 * Linear search checks each element in the array sequentially until the target is found
 * or the end of the array is reached. It works on both sorted and unsorted arrays.
 *
 * Time Complexity: O(n), where n is the number of elements in the array.
 * Space Complexity: O(1).
 *
 * @param {number[]} array - The array to search through.
 * @param {number} target - The value to search for.
 * @returns {number} The index of the target if found; otherwise, -1.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const idx = linearSearch(arr, 3); // idx is 2
 */
function linearSearch(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i; // Return the index if the target is found
    }
  }
  return -1; // Return -1 if the target is not found
}

// Example:

const target = 7;
const result = linearSearch(arr, target);
if (result !== -1) {
  console.log(`Element found at index: ${result}`);
} else {
  console.log("Element not found in the array.");
}
