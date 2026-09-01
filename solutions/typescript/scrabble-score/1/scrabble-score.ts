interface ILookup {[key: string]: number}
let lookup: ILookup = {};
const inlook: ILookup = {"AEIOULNRST":1, "DG":2, "BCMP":3, "FHVWY": 4, "K":5, "JX":8, "QZ":10}
Object.entries(inlook).forEach(([ltrs, num]: [string, number]) => [...ltrs].forEach(
  (ltr: string) => lookup[ltr] = num))

export const score = (word: string): number =>  {
  if (!word) return 0
  return [...word.toUpperCase()].reduce((total, ltr) => total + lookup[ltr], 0)
}