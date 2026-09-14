export function recite(start: number, end: number): string {
  const partsOfLyrics: {[key: string]: string} = {
    'first'   : 'a Partridge in a Pear Tree',
    'second'  : 'two Turtle Doves',
    'third'   : 'three French Hens',
    'fourth'  : 'four Calling Birds',
    'fifth'   : 'five Gold Rings',
    'sixth'   : 'six Geese-a-Laying',
    'seventh' : 'seven Swans-a-Swimming',
    'eighth'  : 'eight Maids-a-Milking',
    'ninth'   : 'nine Ladies Dancing',
    'tenth'   : 'ten Lords-a-Leaping',
    'eleventh': 'eleven Pipers Piping',
    'twelfth' : 'twelve Drummers Drumming'
  };
  let lyrics: string = '';
  const daysNum: string[] = Object.keys(partsOfLyrics);

  for(let i = start-1 ; i < end; i++) {
    lyrics += `On the ${daysNum[i]} day of Christmas my true love gave to me: `
    if(i === 0) {
      lyrics += `${partsOfLyrics[daysNum[i]]}.`;
    } else {
      for(let j = i; j >= 0; j--) {
        lyrics += (j > 0) ? `${partsOfLyrics[daysNum[j]]}, ` : `and ${partsOfLyrics[daysNum[j]]}.`;
      }
    }
    lyrics += `\n`;
  }
  return lyrics;
}