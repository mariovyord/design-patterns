# Big O notation and Time Complexity

## Overview
Big O notation describes how the running time (or space usage) of an algorithm grows relative to the size of its input (n). It focuses on the dominant term and ignores constant factors and lower-order terms because they matter far less as n becomes large.

## Common Complexity Classes
Typical growth rates (fastest to slowest in practical contexts): O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) log‑linear, O(n^2) quadratic, O(2^n) exponential, and O(n!) factorial.

## Worst / Average / Best Cases
Time complexity often has multiple expressions; by convention, Big O usually conveys the worst-case upper bound unless stated otherwise. For example, linear search is O(n) worst-case, binary search is O(log n) (requires sorted input), and well-implemented quicksort averages O(n log n) but degrades to O(n^2) with unlucky pivots.

## Space Complexity
Space complexity (also expressed with Big O) measures auxiliary memory beyond the input itself. Some algorithms trade space for time (e.g., caching / hash maps) while others minimize memory at the cost of more computation.

## Practical Interpretation & Trade‑offs
A lower-order algorithm with better constants may outperform an asymptotically superior one on small inputs, and data structure choice (array vs tree vs hash table) shifts practical performance characteristics. Big O does not measure actual clock time, hardware effects (caches, branch prediction), or constant-time assumptions that may break (e.g., hash collisions). It’s a comparative abstraction—always validate with empirical benchmarks.

## Notation Family: O, Θ, Ω
| Symbol | Meaning | Use Case |
|--------|---------|----------|
| O(f(n)) | Upper bound (at most grows like) | Worst-case guarantee |
| Θ(f(n)) | Tight bound (grows like) | When lower & upper match |
| Ω(f(n)) | Lower bound (at least grows like) | Proving minimal possible cost |

Example: For insertion sort on random data: best Ω(n), worst O(n^2), and typical Θ(n^2).

## Cheat Sheet of Classes
| Class | Name | Intuition | Sample Algorithms / Operations |
|-------|------|----------|---------------------------------|
| O(1) | Constant | No dependence on n | Array index, push to hash set (avg) |
| O(log n) | Logarithmic | Halve the problem each step | Binary search, balanced BST height, heap ops |
| O(n) | Linear | Touch each element once | Linear scan, find max |
| O(n log n) | Log-linear | Linear work at each log level | Mergesort, Heapsort, balanced tree sort |
| O(n^2) | Quadratic | Nested full loops | Naive matrix mult (2-loop), bubble sort |
| O(n^3) | Cubic | Triple nested loops | Naive matrix multiplication |
| O(2^n) | Exponential | Branch on each element | Subset generation, naive TSP recursion |
| O(n!) | Factorial | Permutation enumeration | Brute-force traveling salesman |

## Growth Intuition (n = 10 → 20)
| Class | Relative Increase |
|-------|-------------------|
| O(1) | 1× |
| O(log n) | ~1.3× |
| O(n) | 2× |
| O(n log n) | ~2.6× |
| O(n^2) | 4× |
| O(2^n) | 1024× |
| O(n!) | Astronomical |

## Rules of Thumb for Analysis
1. Keep dominant term; drop lower-order terms (n^2 + n → n^2).
2. Constant factors ignored (3n → n) but still matter in practice.
3. Sequential steps: add costs (O(a) + O(b)).
4. Nested loops: multiply ranges (loop n outside, n inside → O(n^2)).
5. Divide-and-conquer recurrences often yield O(n log n) when problem splits evenly and combining is linear.

## Common Pitfalls
- Assuming hash tables are always O(1) (pathological collision patterns degrade performance).
- Ignoring memory hierarchy: two O(n) algorithms can differ drastically due to cache behavior.
- Forgetting input preconditions (binary search requires sorted data).
- Treating amortized O(1) (dynamic array append) as worst-case guarantee.
- Over-optimizing constants when n is small (premature optimization).

## Example Quick Analyses
- Triple nested loops each to n: O(n^3).
- Loop halves n each iteration: O(log n).
- Two sequential O(n) loops: O(n), not O(2n) or O(n^2).
- Merge two sorted arrays of total length n: O(n).

## When Big O Is Not Enough
Consider: real constants, memory usage, constant factors from hashing, parallelizability, branch misprediction, cache friendliness, I/O latency, and practical dataset sizes.

## Summary
Use Big O to compare scalability, not to predict runtime precisely. Combine theoretical bounds with profiling and benchmarking to make grounded performance decisions.

