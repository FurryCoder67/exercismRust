const operators: { [key: string]: string } = {
    'plus': '+',
    'minus': '-',
    'multiplied by': '*',
    'divided by': '/'
}
const calculate = (a: number, op: string, b: number) => {
    switch(op) {
        case '+': return a + b
        case '-': return a - b
        case '*': return a * b
        case '/': return a / b
        default: return 0
    }
}

export function answer(question: string): number {
    const expr = question
        .replace(/plus|minus|multiplied by|divided by/g, o => operators[o])
        .split(/ |\?/)
        .filter(Boolean)
        .slice(2)

    if(!expr.every(e => !isNaN(Number(e)) || ['+', '-', '*', '/'].includes(e))) {
        throw new Error('Unknown operation')
    }

    const stack: any[] = []
    for(const v of expr) {
        stack.push(isNaN(Number(v)) ? v : Number(v))

        if (stack.length === 3) {
            if(!isNaN(stack[0]) && isNaN(stack[1]) && !isNaN(stack[2])) {
                const b: number = stack.pop()!
                const op: string = stack.pop()!
                const a: number = stack.pop()!

                stack.push(calculate(a, op, b))
            } else {
                throw Error('Syntax error')
            }
        }
    }

    if (stack.length !== 1) {
        throw Error('Syntax error')
    }

    return stack.pop()!
}