export const gamestate = (board: unknown): unknown => {
  if (!Array.isArray(board)) {
    throw new Error('Invalid board')
  }

  const cells = board.join('').split('')

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const hasWon = (player: string) =>
    lines.some(line => line.every(i => cells[i] === player))

  const xCount = cells.filter(cell => cell === 'X').length
  const oCount = cells.filter(cell => cell === 'O').length

  // Check turn order
  if (xCount < oCount) {
    throw new Error('Wrong turn order: O started')
  }

  if (xCount > oCount + 1) {
    throw new Error('Wrong turn order: X went twice')
  }

  const xWon = hasWon('X')
  const oWon = hasWon('O')

  // Both players winning is impossible
  if (xWon && oWon) {
    throw new Error(
      'Impossible board: game should have ended after the game was won'
    )
  }

  // X can only win after X's move
  if (xWon) {
    if (xCount !== oCount + 1) {
      throw new Error(
        'Impossible board: game should have ended after the game was won'
      )
    }

    return 'win'
  }

  // O can only win after O's move
  if (oWon) {
    if (xCount !== oCount) {
      throw new Error(
        'Impossible board: game should have ended after the game was won'
      )
    }

    return 'win'
  }

  // No empty spaces means draw
  if (!cells.includes(' ')) {
    return 'draw'
  }

  return 'ongoing'
}