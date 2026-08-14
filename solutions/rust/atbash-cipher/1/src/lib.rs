use std::iter;

/// "Encipher" with the Atbash cipher.
pub fn encode(plain: &str) -> String {
    translate(plain)
        .enumerate()
        .flat_map(|(i, c)|
            iter::once(' ')
                .filter(move |_| i % 5 == 0 && i != 0)
                .chain(iter::once(c))
        )
        .collect()
}

/// "Decipher" with the Atbash cipher.
pub fn decode(cipher: &str) -> String {
    translate(cipher).collect()
}

fn translate<'a>(to_translate: &'a str) -> impl Iterator<Item=char> + 'a {
    to_translate.chars()
        .filter(|c| c.is_alphanumeric())
        .map(|c| {
            if c.is_numeric() {
                c
            } else {
                (b'a' + (b'z' - c.to_ascii_lowercase() as u8)) as char
            }
        } )
}