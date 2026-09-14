export class List<T> {
  private constructor(private readonly values: T[]) {}

  public static create<T>(...values: T[]): List<T> {
    return new List(values);
  }

  public forEach(fn: (el: T) => unknown): void {
    for (const element of this.values) {
      fn(element);
    }
  }

  public foldl<A>(
    fn: (acc: A, next: T) => A,
    accumulator: A
  ): A {
    if (this.values.length === 0) {
      return accumulator;
    }

    const [head, ...tail] = this.values;

    return List.create(...tail).foldl(
      fn,
      fn(accumulator, head)
    );
  }

  public foldr<A>(
    fn: (acc: A, next: T) => A,
    accumulator: A
  ): A {
    if (this.values.length === 0) {
      return accumulator;
    }

    const [head, ...tail] = this.values;

    return fn(
      List.create(...tail).foldr(fn, accumulator),
      head
    );
  }

  public length(): number {
    return this.foldl((acc) => acc + 1, 0);
  }

  public append(list: List<T>): List<T> {
    return List.create(...this.values, ...list.values);
  }

  public concatenate(list: List<List<T>>): List<T> {
    return list.foldl<List<T>>(
      (acc, next) => acc.append(next),
      List.create(...this.values)
    );
  }

  public filter(fn: (el: T) => boolean): List<T> {
    return List.create(
      ...this.foldl<T[]>(
        (acc, next) => {
          if (fn(next)) {
            return [...acc, next];
          }

          return acc;
        },
        []
      )
    );
  }

  public map<R>(fn: (el: T) => R): List<R> {
    return List.create(
      ...this.foldl<R[]>(
        (acc, next) => [...acc, fn(next)],
        []
      )
    );
  }

  public reverse(): List<T> {
    return List.create(
      ...this.foldl<T[]>(
        (acc, next) => [next, ...acc],
        []
      )
    );
  }
}