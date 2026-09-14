export class InvalidInputError extends Error {
  constructor(message: string) {
    super(message || 'Invalid Input');
  }
}

type Direction = 'north' | 'east' | 'south' | 'west';
type Coordinates = [number, number];

export class Robot {
  private _bearing: Direction = 'north';
  private _coordinates: Coordinates = [0, 0];

  get bearing(): Direction {
    return this._bearing;
  }

  get coordinates(): Coordinates {
    return this._coordinates;
  }

  place({ x, y, direction }: { x: number; y: number; direction: Direction }) {
    if (this.isValidDirection(direction)) {
      this._coordinates = [x, y];
      this._bearing = direction;
    } else {
      throw new InvalidInputError('Invalid direction');
    }
  }

  evaluate(instructions: string) {
    for (const instruction of instructions) {
      if (instruction === 'L') {
        this.turnLeft();
      } else if (instruction === 'R') {
        this.turnRight();
      } else if (instruction === 'A') {
        this.advance();
      } else {
        throw new InvalidInputError('Invalid instruction');
      }
    }
  }

  private isValidDirection(direction: string): direction is Direction {
    return ['north', 'east', 'south', 'west'].includes(direction);
  }

  private turnLeft() {
    const directions: Direction[] = ['north', 'east', 'south', 'west'];
    const currentIndex = directions.indexOf(this._bearing);
    const newIndex = (currentIndex + 3) % 4; // Turn left is equivalent to rotating 270 degrees clockwise
    this._bearing = directions[newIndex];
  }

  private turnRight() {
    const directions: Direction[] = ['north', 'east', 'south', 'west'];
    const currentIndex = directions.indexOf(this._bearing);
    const newIndex = (currentIndex + 1) % 4; // Turn right is equivalent to rotating 90 degrees clockwise
    this._bearing = directions[newIndex];
  }

  private advance() {
    const [x, y] = this._coordinates;

    switch (this._bearing) {
      case 'north':
        this._coordinates = [x, y + 1];
        break;
      case 'east':
        this._coordinates = [x + 1, y];
        break;
      case 'south':
        this._coordinates = [x, y - 1];
        break;
      case 'west':
        this._coordinates = [x - 1, y];
        break;
    }
  }
}
