/// Determines whether the supplied string is a valid ISBN number
pub fn is_valid_isbn(isbn: &str) -> bool {
    let isbn = isbn.replace("-", "");
    if isbn.len() != 10 {
        return false;
    }
    let digits: Option<Vec<u32>> = isbn
        .chars()
        .enumerate()
        .map(|(i, symbol)| symbol_to_digit(i, symbol))
        .collect();
    digits.map_or(false, |digits| digits.iter().sum::<u32>() % 11 == 0)
}

fn symbol_to_digit(i: usize, symbol: char) -> Option<u32> {
    if (9, 'X') == (i, symbol) {
        Some(10)
    } else {
        char::to_digit(symbol, 10).map(|digit| digit * (10 - i as u32))
    }
}