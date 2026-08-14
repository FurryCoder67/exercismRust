pub fn annotate(garden: &[&str]) -> Vec<String> {
    if garden.is_empty() {
        return Vec::new();
    }
    let rows = garden.len();
    let cols = garden[0].len();
    let mut result = Vec::with_capacity(rows);
    
    for (row_idx, row) in garden.iter().enumerate() {
        let bytes = row.as_bytes();
        let mut annotated_row = String::with_capacity(cols);
        for (col_idx, &cell) in bytes.iter().enumerate() {
            if cell == b'*' {
                annotated_row.push('*');
            } else {
                let count = count_adjacent_flowers(garden, row_idx, col_idx, rows, cols);
                
                if count == 0 {
                    annotated_row.push(' ');
                } else {
                    annotated_row.push((b'0' + count) as char);
                }
            }
        }
        
        result.push(annotated_row);
    }
    
    result
}
fn count_adjacent_flowers(
    garden: &[&str],
    row: usize,
    col: usize,
    max_rows: usize,
    max_cols: usize,
) -> u8 {
    let mut count = 0;
    for dr in -1..=1_i32 {
        for dc in -1..=1_i32 {
            if dr == 0 && dc == 0 {
                continue;
            }
            let new_row = row as i32 + dr;
            let new_col = col as i32 + dc;
            if new_row >= 0 && new_row < max_rows as i32 &&
               new_col >= 0 && new_col < max_cols as i32 {
                let neighbor_byte = garden[new_row as usize].as_bytes()[new_col as usize];
                if neighbor_byte == b'*' {
                    count += 1;
                }
            }
        }
    }
    
    count
}   