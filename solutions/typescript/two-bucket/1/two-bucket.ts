type Bucket = { full: number, level: number };

export class TwoBucket {
  private buckets: [Bucket, Bucket];
  private steps = 0;
  constructor(one: number, two: number, private goal: number, private start: 'one' | 'two') {
    this.buckets = start === 'one' ? [{ full: one, level: 0 }, { full: two, level: 0 }]
      : [{ full: two, level: 0 }, { full: one, level: 0 }];
  }
  private gcd(a: number, b: number): number { return b === 0 ? a : this.gcd(b, a % b); }
  moves() {
    const [one, two] = this.buckets;
    if (this.goal % this.gcd(one.full, two.full) !== 0 || 
      this.goal > one.full && this.goal > two.full || !!this.steps)
        throw new Error();
    while (one.level !== this.goal && two.level !== this.goal) {
      if (two.level === two.full) { two.level = 0; }
      else if (one.level === 0) { one.level = one.full; }
      else if (two.full === this.goal) { two.level = two.full; }
      else {
        const diff = Math.min(one.level, two.full - two.level);
        one.level -= diff; two.level += diff;
      }
      this.steps++;
    }
    return this.steps;
  }
  get goalBucket() { return this.buckets[+(this.start === 'two')].level === this.goal ? 'one' : 'two'; }
  get otherBucket() { return this.buckets.find(({ level }) => level !== this.goal)?.level; }
}