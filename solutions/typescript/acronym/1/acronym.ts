export function parse(phrase: string): string {
    return phrase.split(/ |-/g)
        .map(s => s === s.toUpperCase() ? s[0] : s)
        .map(s => s.replace(/[^A-Z]/g, '').length > 1 ?  s.replace(/[^A-Z]/g, '') : s[0].toUpperCase())
        .join('')
}