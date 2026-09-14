type Team = {
    name: string
    win: number
    draw: number
    loss: number
}

export class Tournament {

    private teams: Team[] = []

    public tally(input: string): string {
        const table = ['Team                           | MP |  W |  D |  L |  P']
        if (input === '') {
            return table.join('')
        }

        this.addInput(input)
        this.teams.sort(this.sortTeams)
        this.printTeams(table)

        return table.join('\n')
    }

    protected addInput(input: string): void {
        for (const result of input.split('\n')) {
            const [aName, bName, outcome] = result.split(';'),
                aTeam = this.getTeam(aName),
                bTeam = this.getTeam(bName)

            switch (outcome) {
                case 'win': 
                    aTeam.win++
                    bTeam.loss++
                    break
                case 'draw':
                    aTeam.draw++
                    bTeam.draw++
                    break
                case 'loss':
                    aTeam.loss++
                    bTeam.win++
            }
        }
    }

    protected getTeam(name: string): Team {
        this.addTeam(name)

        return this.teams.find(t => t.name === name)!
    }

    protected addTeam(name: string): void {
        if (!this.teams.find(t => t.name === name)) {
            this.teams.push({ name, win: 0, draw: 0, loss: 0 })
        }
    }

    protected sortTeams(a: Team, b: Team): number {
        const aPoints = 3 * a.win + a.draw,
            bPoints = 3 * b.win + b.draw

        return aPoints === bPoints ? a.name.localeCompare(b.name) : bPoints - aPoints
    }

    protected printTeams(table: string[]): void {
        for(const team of this.teams) {
            const total = String(team.win + team.draw + team.loss).padStart(2),
                win = String(team.win).padStart(2),
                draw = String(team.draw).padStart(2),
                loss = String(team.loss).padStart(2),
                points = String(3 * team.win + team.draw).padStart(2)

            table.push(`${team.name.padEnd(30)} | ${total} | ${win} | ${draw} | ${loss} | ${points}`)
        }
    }
}