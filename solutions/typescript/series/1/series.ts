export class Series {
    public digits: number[]

    constructor(input: string) {
        this.digits = [...input].map(Number)
    }

    slices(no: number): number[][] {
        this.validateInputs(no)

        return this.digits.map((_, i, digits) => digits.slice(i, i + no))
            .filter(series => series.length === no)
    }

    validateInputs(no: number): void {
        if (no === 0) {
            throw Error("slice length cannot be zero")
        }

        if (no < 0) {
            throw Error("slice length cannot be negative")
        }

        if (this.digits.length === 0) {
            throw Error("series cannot be empty")
        }

        if (no > this.digits.length) {
            throw Error("slice length cannot be greater than series length")
        }
    }
}