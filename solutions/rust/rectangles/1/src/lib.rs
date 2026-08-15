use itertools::Itertools;

pub fn count(lines: &[&str]) -> u32 {
    lines
        .iter()
        .enumerate()
        .flat_map(|(y, row)| {
            row.chars()
                .enumerate()
                .filter(|&(_, cell)| cell == '+')
                .map(move |(x, _)| (x, y))
        })
        .combinations(4)
        .filter(|corners| is_rectangle(lines, corners))
        .count() as u32
}

fn is_rectangle(lines: &[&str], corners: &Vec<(usize, usize)>) -> bool {
    let (x1, y1) = corners[0];
    let (x2, y2) = corners[1];
    let (x3, y3) = corners[2];
    let (x4, y4) = corners[3];

    (x1 == x3)
        && (x2 == x4)
        && (y1 == y2)
        && (y3 == y4)
        && lines[y1][x1 + 1..x2]
            .as_bytes()
            .iter()
            .all(|&b| b == b'-' || b == b'+')
        && lines[y3][x3 + 1..x4]
            .as_bytes()
            .iter()
            .all(|&b| b == b'-' || b == b'+')
        && lines[y1 + 1..y3].iter().all(|row| {
            let row = row.as_bytes();

            (row[x1] == b'|' || row[x1] == b'+') && (row[x2] == b'|' || row[x2] == b'+')
        })
}