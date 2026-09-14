interface PalindromicProduct {
  value: number | null
  factors: Array<Array<number>>
}
interface Output {
  smallest: PalindromicProduct
  largest: PalindromicProduct
}
function isPalidromicNumber(n: number): boolean {
  // return `${n}` === `${n}`.split('').reverse().join('') too slow
  for (let i = 0; i < n.toString().length / 2; i++) {
    if (n.toString()[i] !== n.toString()[n.toString().length - i - 1]) {
      return false
    }
  }
  return true
}
export function generate({
  maxFactor,
  minFactor = 1,
}: {
  maxFactor: number
  minFactor?: number
}): Output {
  if (minFactor > maxFactor) {
    throw new Error('min must be <= max')
  }
  let smallest: PalindromicProduct = { value: null, factors: [] }
  let largest: PalindromicProduct = { value: null, factors: [] }
  for (let i = minFactor; i <= maxFactor; i++) {
    for (let j = i; j <= maxFactor; j++) {
      const value = i * j
      if (isPalidromicNumber(value)) {
        if (!smallest.value || value < smallest.value) {
          smallest.value = value
          smallest.factors = [[i, j]]
        } else if (value === smallest.value) {
          smallest.factors.push([i, j])
        } else if (!largest.value || value > largest.value) {
          largest.value = value
          largest.factors = [[i, j]]
        } else if (value === largest.value) {
          largest.factors.push([i, j])
        }
      }
    }
  }
  return { smallest, largest }
}