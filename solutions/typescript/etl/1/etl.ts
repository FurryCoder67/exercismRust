export function transform(old: { [key: string]: string[] }) {
    const newScore: {[key: string]: number } = {}
    for(const point in old) {
        for(const i in old[point]) {
            const c = old[point][i].toLowerCase()
            newScore[c] = Number(point)
        }
    }

    return newScore
}