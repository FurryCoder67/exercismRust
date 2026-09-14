type Spiral = number[][];

export function ofSize(size: number): Spiral {
  const matrix: Spiral = [];

  let x = 0, y = 0, dx = 1, dy = 0, minx = 0, miny = 1, maxx = size - 1, maxy = size - 1;
  
  for (let i = 0; i < size * size; i++) {
    matrix[y] = matrix[y] || [];
    matrix[y][x] = i + 1;

    if (dx == 1 && dy == 0 && x === maxx) {
      dx = 0; dy = 1;
      maxx--;
    }
    else if (dx == 0 && dy == 1 && y === maxy) {
      dx = -1; dy = 0;
      maxy--;
    }
    else if (dx == -1 && dy == 0 && x === minx) {
      dx = 0; dy = -1;
      minx++;
    }
    else if (dx == 0 && dy == -1 && y === miny) {
      dx = 1; dy = 0;
      miny++;
    }
    
    x += dx;
    y += dy;
  }

  return matrix;
}