export class DoubleNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
}
}

export class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
}

  append(value) {
    const node = new DoubleNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
} else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
}
    this.length++;
return node;
}

  peek() {
return this.head;
}

  size() {
return this.length;
}

  remove(value) {
    let cur = this.head;
    while (cur) {
      if (cur.value === value) {
        if (cur.prev) cur.prev.next = cur.next;
        else this.head = cur.next;

        if (cur.next) cur.next.prev = cur.prev;
        else this.tail = cur.prev;

        this.length--;
return true;
}
      cur = cur.next;
}
return false;
}

  toArrayForward() {
    const arr = [];
    let cur = this.head;
    while (cur) {
      arr.push(cur.value);
      cur = cur.next;
}
return arr;
}

  toArrayBackward() {
    const arr = [];
    let cur = this.tail;
    while (cur) {
      arr.push(cur.value);
      cur = cur.prev;
}
return arr;
}
}
