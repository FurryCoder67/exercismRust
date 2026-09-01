export function square(sqrNum: number): bigint {
  if (sqrNum <= 0 || sqrNum > 64) {
    throw 'Square is out of range on a chessboard'
  }
  return (2n ** BigInt(sqrNum)) / 2n
}

export function total(): bigint {
  return (2n ** 64n) - 1n
}