import Node from "./Node";

export default class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let current = this.root;

    while (true) {
      if (value === current.value) {
        console.log(`El valor ${value} ya existe en el árbol`);
        return;
      }

      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  contains(value) {
    let current = this.root;

    while (current !== null) {
      if (value === current.value) return true;
      current = value < current.value ? current.left : current.right;
    }

    return false;
  }

  preorder(node = this.root, result = []) {
    if (node === null) return result;
    result.push(node.value);
    this.preorder(node.left, result);
    this.preorder(node.right, result);
    return result;
  }

  inorder(node = this.root, result = []) {
    if (node === null) return result;
    this.inorder(node.left, result);
    result.push(node.value);
    this.inorder(node.right, result);
    return result;
  }

  postorder(node = this.root, result = []) {
    if (node === null) return result;
    this.postorder(node.left, result);
    this.postorder(node.right, result);
    result.push(node.value);
    return result;
  }

  toD3Tree(node = this.root) {
    if (!node) return null;
    const obj = { name: String(node.value) };
    const children = [];

    if (node.left) children.push(this.toD3Tree(node.left));
    if (node.right) children.push(this.toD3Tree(node.right));

    if (children.length > 0) obj.children = children;

    return obj;
  }
}
