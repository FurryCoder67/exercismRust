use std::cmp::min;

/// While the problem description indicates a return status of 1 should be returned on errors,
/// it is much more common to return a `Result`, so we provide an error type for the result here.
#[derive(Debug, Eq, PartialEq)]
pub enum AffineCipherError {
    NotCoprime(i32),
}

/// Gonna be honest, I had to look this up
/// Best to visualize the factors:
/// 60 = 2 x 2 x 3 x 5
/// 36 = 2 x 2 x 3 x 3
/// common = 2 x 2 x 3 = 12
fn gcd(a: i32, b: i32) -> i32 {
    if a == 0 {
        return b
    } else {
        return gcd(b % a, a)
    }
}

/// Encodes the plaintext using the affine cipher with key (`a`, `b`). Note that, rather than
/// returning a return code, the more common convention in Rust is to return a `Result`.
pub fn encode(plaintext: &str, a: i32, b: i32) -> Result<String, AffineCipherError> {
    if gcd(a, 26) != 1 {
        return Err(AffineCipherError::NotCoprime(a))
    }

    let offset = b'a' as i32;
    let encoded: String = plaintext.to_ascii_lowercase().chars()
        .filter(|c| c.is_alphanumeric())
        .map(|c| {
            if c.is_numeric() {
                c
            } else {
                let x = c as i32 - offset;
                let encoded = (x * a + b) % 26;
                (encoded + offset) as u8 as char
            }
        } )
        .collect::<Vec<char>>()
        .chunks(5)
        .map(|ch| ch.iter().collect::<String>() )
        .collect::<Vec<String>>()
        .join(" ");

    Ok(encoded)
}

/// Decodes the ciphertext using the affine cipher with key (`a`, `b`). Note that, rather than
/// returning a return code, the more common convention in Rust is to return a `Result`.
pub fn decode(ciphertext: &str, a: i32, b: i32) -> Result<String, AffineCipherError> {
    if gcd(a, 26) != 1 {
        return Err(AffineCipherError::NotCoprime(a))
    }

    let offset = b'a' as i32;
    let mmi = (1..26).find(|x| (a * *x) % 26 == 1 ).unwrap();
    let decoded: String = ciphertext.chars()
        .filter(|c| c.is_alphanumeric())
        .map(|c| {
            if c.is_numeric() {
                c
            } else {
                let y = c as i32 - offset;
                let decoded = mmi * (y - b) % 26;
                let decoded = if decoded < 0 { 26 + decoded } else { decoded };
                (decoded + offset) as u8 as char
            }
        } ).collect();

    Ok(decoded)
}