pub fn find_saddle_points(input: &[Vec<u64>]) -> Vec<(usize, usize)> {
    let m = input.len();
    let n = input[0].len();
    let mut result: Vec<(usize, usize)> = vec![];
    if m == 0 || n == 0 {
        return result;
    }
    let max_in_rows: Vec<(usize, usize)> = input
        .iter()
        .enumerate()
        .flat_map(|(irow, row)| {
            let row_max = row.iter().max().unwrap();
            row.iter()
                .enumerate()
                .filter(move |e| e.1 == row_max)
                .map(move |e| (irow, e.0))
        })
        .collect();
    for (i, j) in max_in_rows {
        if (0..m).all(|n| input[n][j] >= input[i][j]) {
            result.push((i, j));
        }
    }
    result
}