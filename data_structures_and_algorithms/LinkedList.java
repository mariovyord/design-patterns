public class LinkedList {
	/** Node represents a single element in the list */
	private static class Node {
		int value;
		Node next;
		Node(int value) { this.value = value; }
	}

	private Node head;
	private Node tail;
	private int size;

	/** Adds element at the front (O(1)) */
	public void addFirst(int value) {
		Node node = new Node(value);
		node.next = head;
		head = node;
		if (tail == null) tail = node;
		size++;
	}

	/** Adds element at the end (O(1)) */
	public void addLast(int value) {
		Node node = new Node(value);
		if (tail == null) {
			head = tail = node;
		} else {
			tail.next = node;
			tail = node;
		}
		size++;
	}

	/** Inserts element at specific index (O(n)) */
	public void insertAt(int index, int value) {
		if (index < 0 || index > size) throw new IndexOutOfBoundsException();
		if (index == 0) { addFirst(value); return; }
		if (index == size) { addLast(value); return; }
		Node prev = nodeAt(index - 1);
		Node node = new Node(value);
		node.next = prev.next;
		prev.next = node;
		size++;
	}

	/** Removes and returns first element (O(1)) */
	public int removeFirst() {
		ensureNotEmpty();
		int val = head.value;
		head = head.next;
		if (head == null) tail = null;
		size--;
		return val;
	}

	/** Removes and returns last element (O(n)) */
	public int removeLast() {
		ensureNotEmpty();
		if (head == tail) { // single element
			int val = head.value;
			head = tail = null;
			size--;
			return val;
		}
		Node prev = head;
		while (prev.next != tail) prev = prev.next;
		int val = tail.value;
		tail = prev;
		tail.next = null;
		size--;
		return val;
	}

	/** Removes element at index (O(n)) */
	public int removeAt(int index) {
		if (index < 0 || index >= size) throw new IndexOutOfBoundsException();
		if (index == 0) return removeFirst();
		if (index == size - 1) return removeLast();
		Node prev = nodeAt(index - 1);
		int val = prev.next.value;
		prev.next = prev.next.next;
		size--;
		return val;
	}

	/** Removes first occurrence of value (O(n)) */
	public boolean remove(int value) {
		if (head == null) return false;
		if (head.value == value) { removeFirst(); return true; }
		Node prev = head;
		while (prev.next != null && prev.next.value != value) prev = prev.next;
		if (prev.next == null) return false;
		if (prev.next == tail) tail = prev;
		prev.next = prev.next.next;
		size--;
		return true;
	}

	/** Returns index of value or -1 (O(n)) */
	public int find(int value) {
		int idx = 0;
		Node cur = head;
		while (cur != null) {
			if (cur.value == value) return idx;
			cur = cur.next; idx++;
		}
		return -1;
	}

	/** Returns size (O(1)) */
	public int size() { return size; }

	/** Returns true if empty (O(1)) */
	public boolean isEmpty() { return size == 0; }

	private Node nodeAt(int index) {
		Node cur = head;
		int i = 0;
		while (i < index) { cur = cur.next; i++; }
		return cur;
	}

	private void ensureNotEmpty() {
		if (head == null) throw new IllegalStateException("List is empty");
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder("[");
		Node cur = head;
		while (cur != null) {
			sb.append(cur.value);
			if (cur.next != null) sb.append(", ");
			cur = cur.next;
		}
		sb.append("]");
		return sb.toString();
	}

	/** Demo */
	public static void main(String[] args) {
		LinkedList list = new LinkedList();
		list.addLast(10);
		list.addLast(20);
		list.addFirst(5);
		list.insertAt(1, 15); // [5,15,10,20]
		System.out.println("List: " + list);
		System.out.println("Index of 10: " + list.find(10));
		list.removeFirst(); // [15,10,20]
		list.removeLast();  // [15,10]
		list.remove(15);    // [10]
		list.addLast(25);   // [10,25]
		System.out.println("Final List: " + list + " (size=" + list.size() + ")");
	}
}
