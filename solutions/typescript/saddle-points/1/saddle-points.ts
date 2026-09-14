type Point = { row: number; column: number }
type Matrix = number[][]

export function saddlePoints(coords: Matrix): Point[] {
  function isLargestInRow(value: number, row: number): boolean {
    return coords[row].every((x) => value >= x)
  }
  
  function isSmallestInColumn(value: number, column: number): boolean {
    return coords.every((row) => value <= row[column])
  }

  function isSaddlePoint(value: number, row: number, column: number): boolean {
    return isLargestInRow(value, row) && isSmallestInColumn(value, column)
  }

  const saddles: Point[] = []

  for (let row = 0; row < coords.length; row++) {
    for (let column = 0; column < coords[row].length; column++) {
      const value = coords[row][column]

      if (isSaddlePoint(value, row, column)) {
        saddles.push({ row: row + 1, column: column + 1 })
      }
    }
  }

  return saddles
}