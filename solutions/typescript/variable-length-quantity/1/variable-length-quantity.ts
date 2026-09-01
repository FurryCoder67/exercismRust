export function encode(values: number[]) {
  return values.reduce((encoded, value) => {
    const sevenBitNumbers: number[] = []
    while (value > 0 || sevenBitNumbers.length === 0) {
      sevenBitNumbers.push(value & 127 | 128);
      value >>>= 7;
    }
    sevenBitNumbers[0] &= 127;
    encoded.push(...sevenBitNumbers.reverse());
    return encoded;
  }, [] as number[]);
}

export function decode(values: number[]) {
  let buffer = 0n;
  return values.reduce((decoded, value, i) => {
    if ((value & 128) === 0) {
      decoded.push(buffer << 7n | BigInt(value));
      buffer = 0n;
    } else {
      buffer = (buffer << 7n) | BigInt(value & 127);
      if (i + 1 === values.length) throw new Error('Incomplete sequence')
    }
    return decoded
  }, [] as BigInt[]).map(Number);
}