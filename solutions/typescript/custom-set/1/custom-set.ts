export class CustomSet<T> {
  constructor(public initial: T[] = []) {
    this.initial = [...new Set(initial)]
  }

  empty(): boolean {
    return this.initial.length === 0
  }

  contains(element: T): boolean {
    return this.initial.includes(element)
  }

  add(element: T): CustomSet<T> {
    if (!this.contains(element)) {
      this.initial.push(element)
    }
    return this
  }

  subset(other: CustomSet<T>): boolean {
    return this.initial.every((element) => other.contains(element))
  }

  disjoint(other: CustomSet<T>): boolean {
    return this.initial.every((element) => !other.contains(element))
  }

  eql(other: CustomSet<T>): boolean {
    return this.subset(other) && other.subset(this)
  }

  union(other: CustomSet<T>): CustomSet<T> {
    return new CustomSet([...this.initial, ...other.initial])
  }

  intersection(other: CustomSet<T>): CustomSet<T> {
    return new CustomSet(this.initial.filter((element) => other.contains(element)))
  }

  difference(other: CustomSet<T>): CustomSet<T> {
    return new CustomSet(this.initial.filter((element) => !other.contains(element)))
  }
}