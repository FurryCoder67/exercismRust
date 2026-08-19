export function isPangram(sentence: string): boolean {
  sentence = sentence.toLowerCase()
  return [..."abcdefghijklmnopqrstuvwxyz"].every(c => sentence.includes(c))
}