export function convert(
  digits: number[],
  inputBase: number,
  outputBase: number
): number[] {
    switch (true) {
        case inputBase <= 1: throw Error('Wrong input base')
        case outputBase <= 1:
        case outputBase !== Math.floor(outputBase): throw Error('Wrong output base')
        case digits.length === 0:
        case digits.length > 1 && digits[0] === 0:
        case digits.some(d => d < 0):
        case digits.some(d => d >= inputBase): throw Error('Input has wrong format')
    }

    return toBase(fromBase(digits, inputBase), outputBase)
}

function fromBase(digits: number[], inputBase: number): number {
    return digits.reverse()
        .reduce((sum, d, i) => sum + d * inputBase ** i, 0)
}

function toBase(value: number, outputBase: number): number[] {
    if (value === 0) {
        return [0]
    }

    let output = []
    while (value > 0) {
        output.push(value % outputBase)
        value = Math.floor(value / outputBase)
    }

    return output.reverse()
}