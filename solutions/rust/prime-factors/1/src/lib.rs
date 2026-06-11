pub fn factors(mut n: u64) -> Vec<u64> {
    let mut prime_factors = Vec::new();
    let mut divisor = 2;
    while n > 1 {
        while n % divisor == 0 {
            prime_factors.push(divisor);
            n /= divisor;
        }
        divisor += 1;
    }
    prime_factors
}