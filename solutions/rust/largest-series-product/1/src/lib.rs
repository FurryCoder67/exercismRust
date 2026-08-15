#[derive(Debug, PartialEq)]
pub enum Error {
    SpanTooLong,
    InvalidDigit(char),
}

pub fn lsp(string_digits: &str, span: usize) -> Result<u64, Error> {
    if span > string_digits.len() {
        return Err(Error::SpanTooLong);
    }
    let mut numbers = vec![];
    for c in string_digits.chars() {
        let n = c.to_digit(10);
        match n {
            Some(n) => numbers.push(n as u64),
            _ => return Err(Error::InvalidDigit(c)),
        }
    }

    if span == 0 {
        return Ok(1);
    }
    Ok(numbers.windows(span).fold(0, |max, ns| {
        let n = ns.iter().product();
        if n > max {
            n
        } else {
            max
        }
    }))
}