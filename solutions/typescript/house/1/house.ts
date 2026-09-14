export function verse(verseNum: number): string[] {
  const actions: string[] = [
    'lay in',
    'ate',
    'killed',
    'worried',
    'tossed',
    'milked',
    'kissed',
    'married',
    'woke',
    'kept',
    'belonged to'
  ];
  const characters: string[] = [
    'house that Jack built.',
    'malt',
    'rat',
    'cat',
    'dog',
    'cow with the crumpled horn',
    'maiden all forlorn',
    'man all tattered and torn',
    'priest all shaven and shorn',
    'rooster that crowed in the morn',
    'farmer sowing his corn',
    'horse and the hound and the horn'
  ];

  let result: string[] = [];
  for(let i = 0; i < verseNum; i++) {
    if(i === verseNum - 1) {
      result.unshift(`This is the ${characters[i]}`);
    } else {
      result.unshift(`that ${actions[i]} the ${characters[i]}`);
    }
  }

  return result;
}

export function verses(verseStart: number, verseEnd: number): string[] {
  let result: string[] = [...verse(verseStart)];
  for(let i = verseStart + 1; i <= verseEnd; i++) {
    result = [...result, '', ...verse(i)];
  }
  return result;
}