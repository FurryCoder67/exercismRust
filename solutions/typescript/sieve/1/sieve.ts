export function primes(n: number): number[] {
  if (n <= 1) {
    return [];
  }

  // Create a boolean array to represent whether each number is prime
  const isPrime: boolean[] = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false; // 0 and 1 are not prime

  // Start with the first prime number, 2
  let p = 2;
  while (p * p <= n) {
    if (isPrime[p]) {
      // Mark all multiples of p as composite
      for (let i = p * p; i <= n; i += p) {
        isPrime[i] = false;
      }
    }
    p++;
  }

  // Collect the prime numbers
  const primes: number[] = [];
  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) {
      primes.push(i);
    }
  }

  return primes;
}