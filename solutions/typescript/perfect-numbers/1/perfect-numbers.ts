type AliquotSum = 'perfect'|'abundant'|'deficient'

export function classify(value: number): AliquotSum {
  function sum(a: number, b: number): number {
    return a + b
  }

  if (value <= 0) throw new Error('Classification is only possible for natural numbers.')
  if (value <= 2) return 'deficient'
  const factors: number[] = []
  
  for (let i = 1; i < value - 1; i += 1) {
    if (value % i === 0) factors.push(i)
  }
  
  const factorSum: number = factors.reduce(sum)

  if (factorSum === value) return 'perfect'
  else if (factorSum > value) return 'abundant'
  return 'deficient'
}