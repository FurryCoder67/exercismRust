export class Triangle {

    isEquilateral: boolean
    isIsosceles: boolean
    isScalene: boolean

    constructor(...sides: number[]) {
        const [a, b, c] = sides.sort()
        const inequality: boolean = c > a + b

        this.isEquilateral = !inequality && a === b && b === c && c !== 0
        this.isIsosceles = !inequality && (a === b || b === c)
        this.isScalene = !inequality && a !== b && b !== c
    }
}