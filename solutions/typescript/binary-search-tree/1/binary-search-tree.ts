export class BinarySearchTree {
  public left: BinarySearchTree | undefined;
  public right: BinarySearchTree | undefined;

  constructor(public data: number) {}

  public insert(item: number) {
    if (item <= this.data) {
      if (this.left) {
        this.left.insert(item);
      } else {
        this.left = new BinarySearchTree(item);
      }
    }

    if (item > this.data) {
      if (this.right) {
        this.right.insert(item);
      } else {
        this.right = new BinarySearchTree(item);
      }
    }
  }

  public each(callback: (data: number) => void) {
    if (this.left) {
      this.left.each(callback);
    }

    callback(this.data);

    if (this.right) {
      this.right.each(callback);
    }
  }
}