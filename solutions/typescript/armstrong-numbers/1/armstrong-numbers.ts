export function isArmstrongNumber(number: unknown): boolean {
  if (typeof number === 'bigint') {
    const numStr: string = number.toString();
    const numDigits: number = numStr.length;
    const digitSum: bigint = Array.from(numStr)
      .map((digit) => BigInt(digit))
      .reduce((acc, curr) => acc + curr ** BigInt(numDigits), 0n);

    return digitSum === number;
  } else if (typeof number === 'number') {
    const numStr: string = number.toString();
    const numDigits: number = numStr.length;
    const digitSum: number = Array.from(numStr)
      .map((digit) => parseInt(digit, 10))
      .reduce((acc, curr) => acc + curr ** numDigits, 0);

    return digitSum === number;
  } else {
    throw new Error('Input must be a number or BigInt');
  }
}