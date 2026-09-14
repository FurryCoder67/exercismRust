type Item = {
  weight: number;
  value: number;
};

export function maximumValue({
  maximumWeight,
  items,
}: {
  maximumWeight: number;
  items: Item[];
}): number {
  const n = items.length;
  
  const dp = Array(maximumWeight + 1).fill(0);

  for (let i = 0; i < n; i++) {
    const { weight, value } = items[i];

    for (let w = maximumWeight; w >= weight; w--) {
      dp[w] = Math.max(dp[w], dp[w - weight] + value);
    }
  }

  return dp[maximumWeight];
}