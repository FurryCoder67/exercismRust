export function verse(verseNum: number): string {
  const verseIndex = verseNum - 1;
  const animals: string[] = ['fly', 'spider', 'bird', 'cat', 'dog', 'goat', 'cow', 'horse'];
  const secondString: string[] = [
    '',
    "It wriggled and jiggled and tickled inside her.\n",
    "How absurd to swallow a bird!\n",
    "Imagine that, to swallow a cat!\n",
    "What a hog, to swallow a dog!\n",
    "Just opened her throat and swallowed a goat!\n",
    "I don't know how she swallowed a cow!\n"
  ];
  let result: string = `I know an old lady who swallowed a ${animals[verseIndex]}.` + '\n'
  if(verseIndex < 7) result += secondString[verseIndex];

  if(verseIndex > 0 && verseIndex < 7) {
    for(let i = verseIndex; i > 0; i--) {
      result += `She swallowed the ${animals[i]} to catch the ${animals[i - 1]}`;
      if(i === 2) result += ' that wriggled and jiggled and tickled inside her';
      result += '.\n'
    }
  }
  if(verseIndex < 7) result += "I don't know why she swallowed the fly. Perhaps she'll die.\n";
  else result += "She's dead, of course!\n";
  return result;
}

export function verses(verseStart: number, verseEnd: number) {
  let result: string = '';
  for(let i = verseStart; i <= verseEnd; i++) {
    result += verse(i);
    if(i !== verseEnd) result += '\n';
  }

  return result;
}