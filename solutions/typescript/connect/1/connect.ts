export class Board {
  private originalBoard: string[] = [];
  private board: string[][] = [];

  constructor(board: string[]) {
    this.originalBoard = board;
  }

  public winner(): string {
    this.prepareBoard();

    if (this.isWinner('O')) {
      return 'O';
    }

    this.prepareBoard();
    this.transposeBoard();

    if (this.isWinner('X')) {
      return 'X';
    }

    return '';
  }

  private prepareBoard() {
    this.board = this.originalBoard.map(line => line.replace(/[^OX\.]/g, '').split(''));
  }

  private isWinner(player: string): boolean {
    this.board[0].forEach((_, col) => this.replaceWinner(player, 0, col));

    return this.board[this.board.length - 1].includes('1');
  }

  private replaceWinner(player: string, row: number, col: number) {
    if (row < 0 || col < 0 || row >= this.board.length || col >= this.board.length) {
      return;
    }

    if (this.board[row][col] == player) {
      this.board[row][col] = '1';
      
      this.replaceWinner(player, row - 1, col);
      this.replaceWinner(player, row - 1, col + 1);
      this.replaceWinner(player, row, col - 1);
      this.replaceWinner(player, row, col + 1);
      this.replaceWinner(player, row + 1, col);
      this.replaceWinner(player, row + 1, col - 1);
    }
  }

  private transposeBoard() {
    this.board = this.board[0].map((_, colIndex) => this.board.map(row => row[colIndex]));
  }
}