const innerRing = 1
const middleRing = 5
const outerRing = 10

export const score = (x: number, y: number) : number => {
  const pointRadius = Math.hypot(x, y)
  const within = (ring: number) => pointRadius <= ring

  if (within(innerRing)) return 10
  if (within(middleRing)) return 5
  if (within(outerRing)) return 1
  return 0
  
};