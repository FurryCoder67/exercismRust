export function calculatePrimeFactors(value: number): number[] {
  let factors: number[] = [];
  while (value > 1) {
    let factor = findFactor(value);
    factors.push(factor);
    value /= factor;
  }
  return factors;
}

function findFactor(value: number): number {
  for (let factor = 2; factor < value; factor++) {
    if (value % factor == 0) {
      return factor;
    }
  }
  return value;
}