export class Triangle {
  public rows: number[][] = [];

  constructor(public limit: number) {
    this.generate();
  }

  private generate(): void {
    this.rows.push([1]);
    for (let i = 1; i < this.limit; i++) {
      this.rows.push(this.generateRow(i));
    }
  }

  private generateRow(row: number): number[] {
    const previousRow = this.rows[row - 1];
  
    const newRow = [];
    newRow.push(1);
    for (let i = 0; i < previousRow.length - 1; i++) {
      newRow.push(previousRow[i] + previousRow[i + 1]);
    }
    newRow.push(1);
    
    return newRow;
  }

  public get lastRow(): number[] {
    return this.rows[this.rows.length - 1];
  }
}