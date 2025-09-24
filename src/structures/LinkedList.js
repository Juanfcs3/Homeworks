export class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
}
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
} else {
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
        if (!this.head) return false;
        if (this.head.value === value) {
        this.head = this.head.next;
        if (!this.head) this.tail = null;
        this.length--;
return true;
}
    let prev = this.head;
    let cur = this.head.next;
    while (cur) {
        if (cur.value === value) {
            prev.next = cur.next;
        if (cur === this.tail) this.tail = prev;
            this.length--;
return true;
}
    prev = cur;
    cur = cur.next;
}
return false;
}

    toArray() {
        const arr = [];
        let cur = this.head;
        while (cur) {
        arr.push(cur.value);
        cur = cur.next;
}
return arr;
}
}
