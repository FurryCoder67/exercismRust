export function count(lines: string[]): number {
  let count = 0;

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] != '+') {
        continue;
      }

      count += countRectanglesFrom(lines, x, y);   
    }
  }
  
  return count;
}

function countRectanglesFrom(lines: string[], x: number, y: number): number {
  let count = 0;

  for (let height = 1; y + height < lines.length; height++) {
    for (let width = 1; x + width < lines[y].length; width++) {
      if (isRectangle(lines, x, y, width, height)) {
        count++;
      }
    }
  }

  return count;
}

function isRectangle(lines: string[], x: number, y: number, width: number, height: number): boolean {
  if (lines[y][x] != '+' || lines[y + height][x] != '+' || lines[y][x + width] != '+' || lines[y + height][x + width] != '+') {
    return false;
  }

  for (let yy = y + 1; yy < y + height; yy++) {
    if ((lines[yy][x] != '|' && lines[yy][x] != '+') || (lines[yy][x + width] != '|' && lines[yy][x + width] != '+')) {
      return false;
    }
  }

  for (let xx = x + 1; xx < x + width; xx++) {
    if ((lines[y][xx] != '-' && lines[y][xx] != '+') || (lines[y + height][xx] != '-' && lines[y + height][xx] != '+')) {
      return false;
    }
  }
  
  return true;
}