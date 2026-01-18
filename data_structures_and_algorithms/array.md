# Array

A compact overview of the array data structure: a contiguous block of memory storing a fixed-length sequence of same-typed elements (conceptually), enabling O(1) indexed access via simple pointer arithmetic.

## Core Properties
- Contiguous memory (good cache locality)
- Constant-time index access: `address = base + (i * element_size)`
- Fixed logical order; physical order matches logical
- Static (fixed size) vs dynamic (resizable with capacity growth)
- Costly middle insert/delete (requires shifting)

## Typical Operations
| Operation | Purpose | Time |
|-----------|---------|------|
| Index read/write | Access / assign element i | O(1) |
| Append (dynamic, amortized) | Add at end | O(1) / O(n) worst on resize |
| Insert/delete middle | Keep order while adding/removing | O(n) |
| Linear search | Find value (unsorted) | O(n) |
| Binary search (sorted) | Find value | O(log n) |
| Copy | Duplicate entire array | O(n) |

## Static vs Dynamic
| Aspect | Static | Dynamic |
|--------|--------|---------|
| Size | Fixed | Flexible (capacity strategy) |
| Append | N/A if full | Amortized O(1) |
| Overhead | Minimal | Capacity metadata + slack |
| Reallocation | Not applicable | Grows by allocating larger block + copy |

## Multidimensional & Variants
- Multidimensional (row-major/column-major) flatten indices into one offset.
- Jagged (array of arrays) trades uniform layout for flexibility.
- Ring buffer: array + modular arithmetic for queues.

## When to Choose
Use an array when you need: fast random access, dense storage, predictable iteration. Avoid if you frequently insert/delete in the middle (consider linked structures or gap buffers) or need sparse indexing (use hash/map).

## Performance Notes
- Sequential scans leverage CPU prefetch → very fast in practice.
- Growth factor (e.g., 1.5x–2x) balances fewer allocations vs wasted space.
- Cache efficiency often beats theoretically similar but pointer-heavy structures.

## Common Pitfalls
- Off-by-one loop bounds
- Confusing length vs capacity (dynamic arrays)
- Inefficient repeated front insertions
- Assuming resizing is free (occasional O(n) copies)

## Minimal Pseudo-code
Linear Search:
```
FOR i ← 0 TO n-1:
  IF A[i] = x: RETURN i
RETURN -1
```
In-place Reverse:
```
l ← 0; r ← n-1
WHILE l < r:
  SWAP A[l], A[r]
  l ← l+1; r ← r-1
```

## Summary
Arrays are the baseline linear structure: simple, memory-efficient, and extremely fast for indexed and sequential access. Their main trade-off is poor performance for structural changes in the middle. Master them to reason about higher-level containers built atop the same principles.