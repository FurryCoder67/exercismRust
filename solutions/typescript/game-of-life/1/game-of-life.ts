export class GameOfLife {
    private status: number[][];

    constructor(matrix: number[][]) {
        this.status = matrix;
    }
  
    public tick() {
        let newStatus = this.status.map(row => [...row]);
        let neighbors: number[] = [];

        for (let i = 0; i < this.status.length; i++) {
            for (let j = 0; j < this.status[i].length; j++) {
                neighbors = [
                    this.status[i-1]?.[j-1],
                    this.status[i-1]?.[j],
                    this.status[i-1]?.[j+1],
                    this.status[i][j-1],
                    this.status[i][j+1],
                    this.status[i+1]?.[j-1],
                    this.status[i+1]?.[j],
                    this.status[i+1]?.[j+1]
                ];
                let sum: number = neighbors.reduce((acc, val) => acc + (val ?? 0), 0);
                console.log(neighbors)
                if (this.status[i][j] === 1 && sum >= 2 && sum <= 3) {
                    newStatus[i][j] = 1;
                } else if (this.status[i][j] === 0 && sum === 3) {
                    newStatus[i][j] = 1;
                } else {
                    newStatus[i][j] = 0;
                }
                neighbors.length = 0;
            }
        }

        this.status = newStatus;
    }
  
    public state(): number[][] {
        return this.status;
    }
}