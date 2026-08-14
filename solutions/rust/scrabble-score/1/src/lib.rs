/// Compute the Scrabble score for a word.
pub fn score(word: &str) -> u64 {
    word.chars()
        .filter(|c| c.is_ascii())
        .map(|c| score_char(c.to_ascii_uppercase()))
        .sum()
}

fn score_char(c: char) -> u64 {
    SCORES[c as usize - 'A' as usize]
}

const SCORES: [u64; 26] = [
    1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10,
];