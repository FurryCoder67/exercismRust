pub fn check(candidate: &str) -> bool {
    unique_chars(candidate) == chars(candidate)
}

fn chars(candidate: &str) -> Vec<char> {
    let mut chars = candidate
        .to_lowercase()
        .chars()
        .filter(|char| char.is_alphabetic())
        .collect::<Vec<char>>();
    chars.sort();
    chars
}

fn unique_chars(candidate: &str) -> Vec<char> {
    let mut chars = chars(candidate);
    chars.dedup();
    chars
}