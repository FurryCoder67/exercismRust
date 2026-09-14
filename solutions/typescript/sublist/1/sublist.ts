export class List<T> {
  protected items: T[]

  constructor(...list: T[]) {
    this.items = list
  }

  compare(anotherList: List<T>) {
    if (this.isEqual(anotherList)) {
      return 'equal'
    }

    if (this.isSublist(anotherList)) {
      return 'sublist'
    }

    if (anotherList.isSublist(this)) {
      return 'superlist'
    }

    return 'unequal'
  }

  isEqual(anotherList: List<T>) {
    if (this.items.length !== anotherList.items.length) {
      return false
    }

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] !== anotherList.items[i]) {
        return false
      }
    }

    return true
  }

  isSublist(anotherList: List<T>) {
    if (this.items.length > anotherList.items.length) {
      return false
    }

    if (this.items.length === 0) {
      return true
    }

    for (let i = 0; i < anotherList.items.length; i++) {
      if (anotherList.items[i] === this.items[0]) {
        let j = 0
        while (j < this.items.length) {
          if (this.items[j] !== anotherList.items[i + j]) {
            break
          }
          j++
        }
        if (j === this.items.length) {
          return true
        }
      }
    }
    return false
  }
}