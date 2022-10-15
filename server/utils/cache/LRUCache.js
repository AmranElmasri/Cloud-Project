class LRUCache {
  constructor(capacity) {
    this.map = {};
    this.list = new DoublyLinkedList();
    this.capacity = capacity;
    this.size = 0;
  }

  get(key) {
    if (!this.map[key]) return -1;
    const node = this.map[key];
    this.list.move2front(node);
    return node.value;
  }
  put(key, value) {
    if (this.map[key]) {
      const node = this.map[key];
      node.value = value;
      this.list.move2front(node);
      return;
    }

    if (this.size === this.capacity) {
      const node = this.list.removeLast();
      delete this.map[node.key];
      this.size--;
    }

    const newNode = new Node(key, value);
    this.list.add(newNode);
    this.map[key] = newNode;
    this.size++;
  }
  clear(){
    this.map = {};
    this.list = new DoublyLinkedList();
    this.size = 0;
  }
}
class DoublyLinkedList {
  constructor() {
    this.head = new Node();
    this.tail = new Node();
    this.connect(this.head, this.tail);
  }

  add(node) {
    this.connect(node, this.head.next);
    this.connect(this.head, node);
  }

  removeLast() {
    const lastNode = this.tail.prev;
    this.delete(lastNode);
    return lastNode;
  }

  move2front(node) {
    this.delete(node);
    this.add(node);
  }

  connect(node1, node2) {
    node1.next = node2;
    node2.prev = node1;
  }

  delete(node) {
    this.connect(node.prev, node.next);
  }
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

export default LRUCache;