const SEVEN_BITS_ON: u8 = 0b111_1111;
const EIGHTH_BIT_ON: u8 = 0b1000_0000;

#[derive(Debug, PartialEq)]
pub enum Error {
    IncompleteNumber,
    Overflow,
}

/// Convert a list of numbers to a stream of bytes encoded with variable length encoding.
pub fn to_bytes(values: &[u32]) -> Vec<u8> {
    let mut output: Vec<u8> = vec![];
    for value in values {
        match value {
            0 => output.push(0),
            _ => {
                let mut bytes: Vec<u8> = vec![];
                let mut value = *value;
                while value > 0 {
                    bytes.push((value as u8 & SEVEN_BITS_ON) | EIGHTH_BIT_ON);
                    value = value >> 7;
                }
                bytes[0] &= SEVEN_BITS_ON;
                bytes.reverse();
                output.extend(bytes);
            }
        }
    }
    output
}

/// Given a stream of bytes, extract all numbers which are encoded in there.
pub fn from_bytes(bytes: &[u8]) -> Result<Vec<u32>, Error> {
    if !bytes.is_empty() && bytes.last().unwrap() & EIGHTH_BIT_ON > 0 {
        return Err(Error::IncompleteNumber);
    }
    let mut curr = 0u32;
    let mut output: Vec<u32> = vec![];
    for byte in bytes {
        match curr > u32::MAX >> 7 {
            false => curr = (curr << 7) + (byte & SEVEN_BITS_ON) as u32,
            true => return Err(Error::Overflow),
        }
        if byte & EIGHTH_BIT_ON == 0 {
            output.push(curr);
            curr = 0;
        }
    }
    Ok(output)
}