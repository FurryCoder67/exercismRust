const a = 'a'.charCodeAt(0),
    A = 'A'.charCodeAt(0)

export function rotate(message: string, n: number) {
    return [...message].map(c => 
        /[a-z]/.test(c) ? String.fromCharCode(a + (c.charCodeAt(0) - a + n) % 26) :
        /[A-Z]/.test(c) ? String.fromCharCode(A +(c.charCodeAt(0) - A + n) % 26) : c
    )
    .join('')
}