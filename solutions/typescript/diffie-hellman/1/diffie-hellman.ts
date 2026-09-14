export class DiffieHellman {
  private p: number;
  private g: number;

  constructor(p: number, g: number) {
    // Check if p and g are valid prime numbers.
    if (!this.isPrime(p) || !this.isPrime(g)) {
      throw new Error('Both p and g must be prime numbers');
    }

    this.p = p;
    this.g = g;
  }

  private isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) {
        return false;
      }
    }
    return true;
  }

  public getPublicKey(privateKey: number): number {
    if (privateKey <= 1 || privateKey >= this.p) {
      throw new Error('Private key must be greater than 1 and less than p');
    }
    return Math.pow(this.g, privateKey) % this.p;
  }

  public getSecret(theirPublicKey: number, myPrivateKey: number): number {
    if (myPrivateKey <= 1 || myPrivateKey >= this.p) {
      throw new Error('My private key must be greater than 1 and less than p');
    }
    return Math.pow(theirPublicKey, myPrivateKey) % this.p;
  }
}
