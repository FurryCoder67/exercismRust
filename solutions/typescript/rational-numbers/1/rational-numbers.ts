export class Rational {
  constructor(public numerator: number, public denominator: number) {
    if (this.denominator === 0) throw new Error('division by zero');
    if (this.numerator === 0) this.denominator = 1;
    if (this.denominator < 0) {
      this.numerator *= -1;
      this.denominator *= -1;
    }
  }
  
  add(value: Rational) {
    return new Rational(
      this.numerator * value.denominator + value.numerator * this.denominator,
      this.denominator * value.denominator
    );
  }

  sub(value: Rational) {
    return new Rational(
      this.numerator * value.denominator - value.numerator * this.denominator,
      this.denominator * value.denominator
    );
  }

  mul(value: Rational) {
    return new Rational(this.numerator * value.numerator, this.denominator * value.denominator).reduce();
  }

  div(value: Rational) {
    return new Rational(this.numerator * value.denominator, this.denominator * value.numerator);
  }

  abs() {
    return new Rational(Math.abs(this.numerator), Math.abs(this.denominator)).reduce();
  }

  exprational(pow: number) {
    return pow >= 0
      ? new Rational(this.numerator ** pow, this.denominator ** pow)
      : new Rational(this.denominator ** -pow, this.numerator ** -pow);
  }

  expreal(num: number) {
    return num ** (this.numerator / this.denominator);
  }

  reduce() {
    const divisor = this.gcd(this.numerator, this.denominator);
    return new Rational(this.numerator / divisor, this.denominator / divisor);
  }

  private gcd(a: number, b: number): number { return !b ? a : this.gcd(b, a % b); }
}