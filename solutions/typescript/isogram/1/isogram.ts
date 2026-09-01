export function isIsogram(word: string): boolean {
    const chars: string[] = [...word.toLowerCase()].filter(c => /[a-z]/.test(c))

    return new Set(chars).size === chars.length
}