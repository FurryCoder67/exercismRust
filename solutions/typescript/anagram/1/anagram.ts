export class Anagram {
    private word: string

    constructor(word: string) {
        this.word = word.toLowerCase()
    }

    matches(...words: string[]) {
        const sorted = [...this.word].sort().join('')
        return words.filter(w => w.toLowerCase() !== this.word &&
                sorted === [...w.toLowerCase()].sort().join(''))
    }
}