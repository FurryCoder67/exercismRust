pub fn raindrops(n: u32) -> String {
    let mut x: String = "".to_string();
    if n % 3 == 0 {
        x = "Pling".to_string();
    }
    if n % 5 == 0 {
        x += "Plang"
    }
    if n % 7 == 0 {
        x += "Plong"
    }
    if x == "" {
        x = n.to_string()
    }
    return x;
}