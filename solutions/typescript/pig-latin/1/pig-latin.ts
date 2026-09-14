export function translate(phrase: string): string {
  let words: string[] = phrase.split(' ');
  words = words.map(word => {
    const vowelSounds = new RegExp('^(yt|xr|[aeiouy])', 'gi');
    if(vowelSounds.test(word) && !word.startsWith('ye')) {
      word = `${word}ay`;
    } else {
      const vowelIndex: number = !word.startsWith('ye') ? word.search(/([aeiouy])/gi) : 1;
      if(word.substring(vowelIndex-1, vowelIndex+1) === 'qu') {
        word = word.substring(vowelIndex+1) + word.substring(0, vowelIndex+1) + 'ay';
      } else {
        word = word.substring(vowelIndex) + word.substring(0, vowelIndex) + 'ay';
      }
    }
    return word;
  });
  return words.join(' ');
}