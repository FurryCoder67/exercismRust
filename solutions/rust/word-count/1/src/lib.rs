use std::collections::HashMap;

pub fn word_count(words: &str) -> HashMap<String, u32> {
    let mut counts = HashMap::new();

    for word in words
        .to_lowercase()
        .split(|c: char| !c.is_alphanumeric() && c != '\'')
        .map(|w| w.trim_matches('\''))
        .filter(|w| !w.is_empty())
    {
        *counts.entry(word.to_string()).or_insert(0) += 1;
    }

    counts
}