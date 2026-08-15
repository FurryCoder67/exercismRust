pub struct Luhn {
    digits: String,
}

impl Luhn {
    pub fn is_valid(&self) -> bool {
        let code = self.digits.replace(" ", "");

        if code.len() <= 1 {
            return false;
        }

        let mut sum = 0;

        for (i, c) in code.chars().enumerate() {
            match c.to_digit(10) {
                None => return false,
                Some(mut d) => {
                    if (i + code.len()) % 2 == 0 {
                        d *= 2;

                        if d > 9 {
                            d -= 9;
                        }
                    }

                    sum += d;
                }
            }
        }

        sum % 10 == 0
    }
}

impl<T: ToString> From<T> for Luhn {
    fn from(input: T) -> Self {
        Self {
            digits: input.to_string(),
        }
    }
}