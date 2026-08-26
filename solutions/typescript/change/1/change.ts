export const findFewestCoins = (
  coins: unknown,
  target: unknown,
): number[] => {
  const values = coins as number[]
  const amount = target as number

  // 1. Validation for negative target (exact message required by test)
  if (amount < 0) {
    throw new Error("target can't be negative")
  }

  if (amount === 0) {
    return []
  }

  // 2. Dynamic programming setup
  const dp: number[] = Array(amount + 1).fill(Infinity)
  const parent: number[] = Array(amount + 1).fill(-1)

  dp[0] = 0

  for (let current = 1; current <= amount; current++) {
    for (const coin of values) {
      if (current >= coin && dp[current - coin] + 1 < dp[current]) {
        dp[current] = dp[current - coin] + 1
        parent[current] = coin
      }
    }
  }

  // 3. Validation for unreachable target (exact message required by test)
  if (dp[amount] === Infinity) {
    throw new Error("can't make target with given coins")
  }

  // 4. Reconstruct the coin array
  const result: number[] = []
  let curr = amount

  while (curr > 0) {
    const coin = parent[curr]
    result.push(coin)
    curr -= coin
  }

  // Ensure ascending output order to match expected outputs
  return result.sort((a, b) => a - b)
}