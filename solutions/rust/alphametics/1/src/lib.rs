use std::collections::{HashMap, HashSet};
use itertools::Itertools;

// The core idea is to transform equation before permutations testing, to calculate it as quickly as possible.
// The simplest data model for testing would be just a list of letter factors (coefficiens), 
//     so that factors multiplied by letter values and summized will give 0 for correct solution.
// For that, we should got through the equation, sum and remember factors per letter, 
//     determined by the letter position in the word (x1, x10, x100, etc).
// After "==" we should change the sign of the factors, and it's convenient to parse reversed input string.
// Sorting letters/factors also impact on performance, as I've found. 
// Additionally, we have to check found solution against "no zero first" rule, 
//     so we need to know which letters occurs at the first position in an encoded number. 

fn calc_factors(input: &str) -> (Vec<char>, Vec<i64>) {
    let mut factors = HashMap::new();
    let mut sign = -1;
    let mut pos = 0;
    for c in input.chars().filter(|c| !c.is_whitespace()).rev() {
        match c {
            '=' => { sign = 1; pos = 0 },
            '+' => { pos = 0 },
            _ => { *factors.entry(c).or_insert(0) += sign * 10_i64.pow(pos); pos += 1; }
        }
    }
    factors.into_iter().sorted_by_key(|(_, v)| -v.abs()).unzip()
}

pub fn solve(input: &str) -> Option<HashMap<char, u8>> {
    let firsts = input.split(&['+', '=']).filter_map(|s| s.trim().chars().next()).collect::<HashSet<_>>();
    let  (letters, factors) = calc_factors(&input);
    for perm in (0..=9).permutations(letters.len()) {
        let sum = perm.iter().enumerate().map(|(i, v)| v * factors.get(i).unwrap()).sum::<i64>();
        if sum == 0 && !perm.iter().enumerate().any(|(i, v)| *v == 0 && firsts.contains(letters.get(i).unwrap())) {
            return Some(HashMap::from_iter(perm.iter().enumerate().map(|(i, v)| (*letters.get(i).unwrap(), *v as u8))));
        }
    }
    None
}