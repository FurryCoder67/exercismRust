use std::collections::HashSet;

pub fn find(sum: u32) -> HashSet<[u32; 3]> {
    (1..sum / 3)
        .map(|a| {
            let bc = sum - a;
            let b = (bc * bc - a * a) / (2 * bc);
            [a, b, bc - b]
        })
        .filter(|[a, b, c]| a < b && a * a + b * b == c * c)
        .collect()
}