export function annotate(field: unknown): unknown {
  const rows = field as string[];
  if (!rows || rows.length === 0) return [];

  const height = rows.length;
  const width = rows[0]?.length ?? 0;

  const dirs = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1],
  ];

  return rows.map((row, y) =>
    row
      .split('')
      .map((cell, x) => {
        if (cell === '*') return '*';
        let count = 0;
        for (const [dy, dx] of dirs) {
          const ny = y + dy;
          const nx = x + dx;
          if (
            ny >= 0 && ny < height &&
            nx >= 0 && nx < width &&
            rows[ny][nx] === '*'
          ) {
            count++;
          }
        }
        return count > 0 ? String(count) : ' ';
      })
      .join('')
  );
}   