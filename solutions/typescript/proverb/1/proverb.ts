export function proverb(...words: string[]): string {
  let rhyme: string = '';
  for(let i = 1; i < words.length; i++) {
    rhyme = rhyme + `For want of a ${words[i - 1]} the ${words[i]} was lost.\n`;
  }
  return rhyme + `And all for the want of a ${words[0]}.`;
}