export function isPaired(input: string): boolean {
    input = input.replace(/[^()[\]{}]/g, '')

    let old_length
    while(old_length !== input.length) {
        old_length = input.length
        input = input.replace(/\(\)|\[\]|\{\}/, '')
    }

    return input === ''
}