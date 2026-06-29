pub fn is_valid(code: &str) -> bool {
    let cleaned: String = code.chars().filter(|&c| c != ' ').collect();
    if cleaned.len() <= 1 {
        return false;
    }
    if !cleaned.chars().all(|c| c.is_ascii_digit()) {
        return false;
    }
    let mut sum = 0;
    for (i, c) in cleaned.chars().rev().enumerate() {
        let mut digit = c.to_digit(10).unwrap();
        if i % 2 == 1 {
            digit *= 2;
            if digit > 9 {
                digit -= 9;
            }
        }
        sum += digit;
    }
    sum % 10 == 0
}