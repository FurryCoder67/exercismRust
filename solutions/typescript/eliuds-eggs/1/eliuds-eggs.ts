//
// This is only a SKELETON file for the 'Pop Count' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const eggCount = (displayValue: number): number => {
  return displayValue.toString(2)
                     .split('')
                     .map(Number)
                     .reduce((acc, el) => acc + el)
}