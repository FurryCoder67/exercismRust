export function flatten(input: any[]): any[] {
    return input.flat(10).filter(v => v !== undefined)
}