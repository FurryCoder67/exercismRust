export function transpose(matrix: string[]): string[] {
  let max = matrix.reduce((a, b) => b.length > a.length ? b : a, '');
  let index = matrix.indexOf(max);

  if (index === -1) {
    return [];
  }

  matrix = matrix[index].split('').map((_, c) => matrix.map(row => row[c] || ' ').join(''));
  matrix[matrix.length - 1] = matrix[matrix.length - 1].trimEnd();
  return matrix;
}