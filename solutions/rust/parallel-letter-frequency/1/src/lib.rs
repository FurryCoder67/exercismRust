use std::collections::HashMap;
use rayon::prelude::*;

pub fn frequency(input: &[&str], _worker_count: usize) -> HashMap<char, usize> {
    input
        .par_iter()
        .map(|text| {
            text.chars()
                .filter(|c| c.is_alphabetic())
                .flat_map(|c| c.to_lowercase())
                .fold(HashMap::new(), |mut acc, c| {
                    *acc.entry(c).or_insert(0) += 1;
                    acc
                })
        })
        .reduce(HashMap::new, |mut acc, partial| {
            for (key, count) in partial {
                *acc.entry(key).or_insert(0) += count;
            }
            acc
        })
}   