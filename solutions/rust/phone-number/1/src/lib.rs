pub fn number(user_number: &str) -> Option<String> {
    let digits: String = user_number.chars().filter(|c| c.is_ascii_digit()).collect();

    let digits = match digits.len() {
        10 => digits,
        11 if digits.starts_with('1') => digits[1..].to_string(),
        _ => return None,
    };

    let area = digits.chars().next()?;          // Changed
    let exchange = digits.chars().nth(3)?; 

    if area < '2' || exchange < '2' {
        return None;
    }

    Some(digits)
}