interface TripletsParams {
  sum: number;
  minFactor?: number;
  maxFactor?: number;
}
class Triplet {
  constructor(public a: number, public b: number, public c: number) {}

  toArray(): [number, number, number] {
    return [this.a, this.b, this.c];
  }
}

export function triplets(params: TripletsParams): Triplet[] {
  const N = params.sum;
  const minFactor = Math.max(1, params.minFactor ?? 0);
  const maxFactor = (i: number): number =>
    Math.min(N / i, params.maxFactor ?? Infinity);
  const result: Triplet[] = [];

  for (let a = minFactor; a <= maxFactor(3); a++) {
    for (let b = a + 1; b <= maxFactor(2); b++) {
      const c = N - a - b;
      if (c > maxFactor(1)) continue;
      if (a * a + b * b === c * c) {
        result.push(new Triplet(a, b, c));
      }
    }
  }

  return result;
}