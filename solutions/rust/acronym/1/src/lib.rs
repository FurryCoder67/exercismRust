pub fn abbreviate(phrase: &str) -> String {
    phrase
        .split_whitespace()
        .map(|w| {
            w.split(|c: char| !c.is_ascii_alphabetic() && c != '\'')
                .map(|alphs| {
                    let all_caps = alphs.chars().all(|c| c.is_ascii_uppercase());
                    alphs
                        .chars()
                        .enumerate()
                        .filter_map(|(i, b)| {
                            (i == 0 || (!all_caps && b.is_ascii_uppercase()))
                                .then(|| b.to_ascii_uppercase())
                        })
                        .collect::<String>()
                })
                .collect::<String>()
        })
        .collect()
}