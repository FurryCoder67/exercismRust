export function convert(input: string) {
  let lines = input.split('\n');

  let numbers: string[] = [];
  while (lines.length > 0) {
    numbers.push(convertLine(lines.splice(0, 4)));
  }

  return numbers.join(',');
}

function convertLine(line: string[]): string {
  let digitsCount = line[0].length / 3;

  let digits: string[] = [];
  for (let i = 0; i < digitsCount; i++) {
    let digitCode = line[0].substring(i * 3 + 0, i * 3 + 3) + line[1].substring(i * 3 + 0, i * 3 + 3) + line[2].substring(i * 3 + 0, i * 3 + 3);
    digits.push(convertDigit(digitCode));
  }
  
  return digits.join('');
}

function convertDigit(digitCode: string): string {
  switch (digitCode) {
    case ' _ | ||_|': return '0';
    case '     |  |': return '1';
    case ' _  _||_ ': return '2';
    case ' _  _| _|': return '3';
    case '   |_|  |': return '4';
    case ' _ |_  _|': return '5';
    case ' _ |_ |_|': return '6';
    case ' _   |  |': return '7';
    case ' _ |_||_|': return '8';
    case ' _ |_| _|': return '9';
    default: return '?';
  }
}