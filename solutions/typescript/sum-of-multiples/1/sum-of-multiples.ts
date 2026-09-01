export function sum(factors: number[], number: number): number {
    return [...Array(number).keys()]
        .filter(i => factors.some(factor => i % factor === 0))
        .reduce((sumMulti, i) => sumMulti + i, 0)
}