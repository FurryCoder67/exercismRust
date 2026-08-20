// formulae found at
// https://learnersbucket.com/examples/algorithms/difference-between-square-of-sum-of-numbers-and-sum-of-square-of-numbers/

export class Squares {
  readonly input: number;
  
  constructor(input: number) {
    this.input = input;
  }

  get sumOfSquares() : number {
    return (this.input * (this.input + 1) * ((this.input * 2) + 1)) / 6;
  }

  get squareOfSum(): number {
    let sum =  (this.input * (this.input + 1)) / 2;
    return sum * sum;
  }

  get difference(): number {
    return this.squareOfSum - this.sumOfSquares;
  }
}