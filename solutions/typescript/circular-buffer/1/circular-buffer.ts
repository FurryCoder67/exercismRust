export default class CircularBuffer<T> {
    private readonly size: Number
    private store: T[] = []

    constructor(size: Number) {
        this.size = size
    }

    public read(): T | undefined {
        if (CircularBuffer.empty(this.store)) {
            throw new BufferEmptyError()
        }

        return this.store.shift()
    }

    public write(value: T) {
        if (CircularBuffer.full(this.store, this.size)) {
            throw new BufferOverflowError()
        }

        this.store.push(value)
    }

    public forceWrite(value: T) {
        if (CircularBuffer.full(this.store, this.size)) {
            this.read()
        }

        this.write(value)
    }

    public clear(): void {
        this.store = []
    }

    private static full<T>(store: T[], size: Number): boolean {
        return store.length === size
    }

    private static empty<T>(store: T[]): boolean {
        return store.length === 0
    }
}

export class BufferOverflowError extends Error { }

export class BufferEmptyError extends Error { }