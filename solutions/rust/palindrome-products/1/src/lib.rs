use std::collections::HashSet;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Palindrome {
    val: u64,
    min: u64,
    max: u64,  // Store the range to use when calculating factors
}

impl Palindrome {
    pub fn value(&self) -> u64 {
        self.val
    }
    
    pub fn into_factors(self) -> HashSet<(u64, u64)> {
        let mut factors = HashSet::new();
        let val = self.val;
        
        // Find all factor pairs within range
        for i in self.min..=((val as f64).sqrt() as u64).min(self.max) {
            if val % i == 0 {
                let j = val / i;
                if j >= self.min && j <= self.max {
                    factors.insert((i, j));
                }
            }
        }
        
        factors
    }
}

pub fn is_palindrome(num: u64) -> bool {
    let mut original = num;
    let mut reversed = 0;
    
    while original > 0 {
        reversed = reversed * 10 + original % 10;
        original /= 10;
    }
    
    num == reversed
}

pub fn palindrome_products(min: u64, max: u64) -> Option<(Palindrome, Palindrome)> {
    if min > max {
        return None;
    }
    
    let mut min_palindrome: Option<u64> = None;
    let mut max_palindrome: Option<u64> = None;
    
    // Find all palindrome products in the range
    for i in min..=max {
        for j in i..=max {  // Start from i to avoid duplicates
            let product = i * j;
            
            if is_palindrome(product) {
                // Update minimum palindrome
                if min_palindrome.is_none() || product < min_palindrome.unwrap() {
                    min_palindrome = Some(product);
                }
                
                // Update maximum palindrome
                if max_palindrome.is_none() || product > max_palindrome.unwrap() {
                    max_palindrome = Some(product);
                }
            }
        }
    }
    
    match (min_palindrome, max_palindrome) {
        (Some(min_val), Some(max_val)) => Some((
            Palindrome { val: min_val, min, max },
            Palindrome { val: max_val, min, max }
        )),
        _ => None
    }
}