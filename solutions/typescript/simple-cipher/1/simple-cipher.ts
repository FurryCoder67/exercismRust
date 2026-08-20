const LOWER = 'a'.charCodeAt(0), LETTERS = 26;

export class SimpleCipher {
  constructor(public readonly key: string = SimpleCipher.randomKey()) {}
  
  encode(plain: string, invert = false) {
    return String.fromCharCode(
        ...[...plain].map((c, i) => ((LETTERS + (c.charCodeAt(0) - LOWER) + (invert ? -1 : 1) * (this.key.charCodeAt(i % this.key.length) - LOWER)) % LETTERS) + LOWER)
    );
  }

  decode(code: string) { return this.encode(code, true) }

  private static randomKey(length = 100): string {
    return String.fromCharCode(...Array.from({ length }, () => LOWER + Math.random() * LETTERS | 0));
  }
}