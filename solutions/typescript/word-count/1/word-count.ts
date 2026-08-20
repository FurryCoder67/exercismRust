export const count = (phrase: string): Map<string, number> => 
  [...(phrase.toLowerCase().match(/\b[\w']+\b/g) ?? [])]
  .reduce((output, word) => {
      output.set(word, (output.get(word) ?? 0) + 1);
      return output;}, new Map<string, number>());