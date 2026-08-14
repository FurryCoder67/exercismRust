fn is_multiple(nr: &u32, factors: &[u32]) -> bool {
    factors.iter().find(|f| **f != 0 && nr % *f==0).is_some()
}
pub fn sum_of_multiples(limit: u32, factors: &[u32]) -> u32 {
    (1..limit).filter(|x| is_multiple(x, factors)).sum()
}