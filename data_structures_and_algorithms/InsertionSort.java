public class InsertionSort {
    /**
     * Sorts an array in ascending order using the insertion sort algorithm.
     * Insertion sort builds the final sorted array one item at a time. It is
     * much less efficient on large lists than more advanced algorithms such as
     * quicksort, mergesort, or heapsort, but it has advantages:
     *  - Simple implementation
     *  - Efficient for (mostly) small or nearly sorted data sets
     *  - Stable (does not change the relative order of equal elements)
     *  - In-place (only requires O(1) extra memory)
     *
     * Time Complexity:
     *  Worst Case: O(n^2) (array in reverse order)
     *  Average Case: O(n^2)
     *  Best Case: O(n) (already sorted array)
     * Space Complexity: O(1)
     *
     * @param arr the array to be sorted (will be modified in-place)
     */
    public static void insertionSort(int[] arr) {
        int n = arr.length;

        for (int i = 1; i < n; i++) {

            int key = arr[i];        // Element to be positioned

            int j = i - 1;
            
            // Shift elements of arr[0..i-1] that are greater than key
            // to one position ahead of their current position
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key; // Place key after the element just smaller than it
        }
    }

    // Utility to print array
    private static void printArray(int[] arr) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < arr.length; i++) {
            sb.append(arr[i]);
            if (i < arr.length - 1) sb.append(", ");
        }
        sb.append("]");
        System.out.println(sb.toString());
    }

    /** Example usage */
    public static void main(String[] args) {
        int[] arr = { 5, 2, 9, 1, 5, 6 };
        System.out.print("Original: ");
        printArray(arr);
        insertionSort(arr);
        System.out.print("Sorted:   ");
        printArray(arr);
    }
}
