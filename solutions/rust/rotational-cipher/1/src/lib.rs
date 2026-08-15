pub fn rotate(input: &str, key: u8) -> String {
    input
        .chars()
        .map(|c| {
            if c.is_ascii_lowercase() {
                (((c as u8 - b'a' + key) % 26) + b'a') as char
            } else if c.is_ascii_uppercase() {
                (((c as u8 - b'A' + key) % 26) + b'A') as char
            } else {
                c
            }
        })
        .collect()
}