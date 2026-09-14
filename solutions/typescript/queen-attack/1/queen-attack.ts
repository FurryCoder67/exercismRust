type Position = readonly [number, number]

type Positions = {
  white: Position
  black: Position
}
export class QueenAttack {
  public readonly black: Position
  public readonly white: Position

  private checkValidQueenPosition(pos: Position) {
    if (pos[0] < 0 || pos[0] >= 8 || pos[1] < 0 || pos[1] >= 8) {
      throw new Error("Queen must be placed on the board");
    }
  }

  // white: [whiteRow, whiteColumn]
  // black: [blackRow, blackColumn]
  constructor(pos: Partial<Positions> = {}) {
    const { white = [7, 3], black = [0, 3] } = pos;
    this.checkValidQueenPosition(white);
    this.checkValidQueenPosition(black);
    if (white[0] === black[0] && white[1] === black[1]) {
      throw new Error("Queens cannot share the same space");
    }
    this.black = black;
    this.white = white;
  }

  toString(): string {
    const MAXIMUM_DIMENSION_SIZE = 8;
    let row = "";
    for (let i = 0; i < MAXIMUM_DIMENSION_SIZE; i++) {
      for (let j = 0; j < MAXIMUM_DIMENSION_SIZE; j++) {
        if (i === this.black[0] && j === this.black[1]) {
          row += "B ";
        } else if (i === this.white[0] && j === this.white[1]) {
          row += "W ";
        } else {
          row += "_ ";
        }
      }
      row = row.slice(0, row.length - 1);
      if (i !== MAXIMUM_DIMENSION_SIZE - 1) {
        row += "\n";
      }
    }
    return row;
  }

  get canAttack() {
    const columnGap = Math.abs(this.black[1] - this.white[1]);
    const rowGap = Math.abs(this.black[0] - this.white[0]);
    return columnGap === 0 ||
      rowGap === 0 ||
      columnGap === rowGap;
  };
}