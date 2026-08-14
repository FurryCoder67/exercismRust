pub fn primes_up_to(upper_bound: u64) -> Vec<u64> {
    let mut sieve: Vec<bool> = vec![true; (upper_bound + 1) as usize];
    let mut result: Vec<u64> = Vec::new();

    for i in 2..upper_bound + 1 {
        if !sieve[i as usize] {
            continue;
        }
        result.push(i);

        let mut mults = 2;
        while mults * i <= upper_bound {
            sieve[(mults * i) as usize] = false;
            mults += 1;
        }
    }
    result
}