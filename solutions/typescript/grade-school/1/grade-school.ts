/** * Done by Mdkhaki mdkhaki.com */

export class GradeSchool {
    private _roster: Map<number, string[]> = new Map()

    roster() {
        this._roster.forEach((names) => {
            names.sort()
        })
        return JSON.parse(JSON.stringify(Object.fromEntries(this._roster)))
    }
    add(name: string, grade: number) {
        this._roster.forEach((names, key) => {
            if (names.includes(name)) this._roster.delete(key)
        })
        if (this._roster.get(grade)) {
            this._roster.set(grade, [...this._roster.get(grade)!, name])
        } else {
            this._roster.set(grade, [name])
        }
    }
    grade(grade: number) {
        return this.roster()[grade] ?? []
    }
}