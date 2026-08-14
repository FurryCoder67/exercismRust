pub fn encode(source: &str) -> String {
    let mut output = String::new();
    let mut chars = source.chars().peekable();
    let mut curr_count = 0;
    while let Some(curr) = chars.next() {
        curr_count += 1;
        if chars.peek() != Some(&curr) {
            if curr_count > 1 {
                output.push_str(&curr_count.to_string())
            }
            output.push(curr);
            curr_count = 0;
        }
    }
    output
}

pub fn decode(source: &str) -> String {
    let mut output = String::new();
    let mut group = String::new();

    for c in source.chars() {
        if c.is_numeric() {
            group.push(c);
        } else {
            let n = group.parse().unwrap_or(1);
            output += c.to_string().repeat(n).as_str();
            group.clear();
        }
    }
    output
}