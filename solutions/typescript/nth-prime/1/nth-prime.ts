export function nth(n: number): number {
  if (n <= 0) {
    throw new Error('Prime is not possible');
  }

  let count = 0;
  let current = 2;
  let isPrime = true;
  const primes = [];

  while (count < n) {
    for (let i = 0; i < primes.length && primes[i] <= Math.sqrt(current); i++) {
      if (current % primes[i] === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(current);
      count++;
    }
    isPrime = true;
    current++;
  }

  return primes[n - 1];
}