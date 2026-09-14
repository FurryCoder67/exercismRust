export function makeDiamond(character: string): string {
  let diamond = '';

  let height = character.charCodeAt(0) - 'A'.charCodeAt(0);

  for (let i = 0; i < height; i++) {
    diamond += makeRow(height, i) + '\n';
  }

  for (let i = height; i >= 0; i--) {
    diamond += makeRow(height, i) + '\n';
  }

  return diamond;
}

function makeRow(height: number, i: number): string {
  let padding = ' '.repeat(height - i);
  let letters = String.fromCharCode(i + 'A'.charCodeAt(0));
  if (letters !== 'A') {
    let space = ' '.repeat(i * 2 - 1);
    letters = letters + space + letters;
  }
  return padding + letters + padding;
}