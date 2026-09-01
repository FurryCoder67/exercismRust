export function valid(id: string): boolean {
  const idWithoutSpaces = id.replace(/\s+/g, '')
  if (idWithoutSpaces.length <= 1) {
    return false
  }

  return getLuhnSum(idWithoutSpaces) % 10 === 0
}

function getLuhnSum(idWithoutSpaces: string) {
  return [...idWithoutSpaces]
    .map(Number)
    .map(toLuhn)
    .reduce(sum)
}

function toLuhn(digit: number, index: number, array: number[]): number {
  if (array.length % 2 === 0 && index % 2 === 0) {
    return doTheLuhn(digit);
  }
  if (array.length % 2 !== 0 && index % 2 !== 0) {
    return doTheLuhn(digit)
  }
  return digit
}

function doTheLuhn(digit: number) {
  let num = digit * 2
  if (num > 9) {
    num -= 9
  }
  return num
}

function sum(p: number, c: number) {
  return p + c
}

// More performant way, but I love me some .map()
/*
    for (let i = arr.length - 2; i >= 0; i -= 2) {
      let num = arr[i] * 2
      if (num > 9) {
        num -= 9
      }

      arr[i] = num
    }
*/