#[derive(Debug, PartialEq)]
pub enum Error {
    InvalidRowCount(usize),
    InvalidColumnCount(usize),
}

pub fn convert(input: &str) -> Result<String, Error> {
    let (rows, cols) = grid_stats(input);
    if rows % 4 != 0 {
        return Err(Error::InvalidRowCount(rows));
    } else if cols % 3 != 0 {
        return Err(Error::InvalidColumnCount(cols));
    }

    let input = &input.replace("\n", "");
    let mut result = vec![String::new(); (rows * cols) / 12];
    let (mut word, mut row, mut col) = (0, 0, 0);

    for c in input.chars() {
        result[word].push(c);
        col += 1;
        if col % 3 == 0 {
            word += 1;
        }
        if col == cols {
            word -= cols / 3;
            row += 1;
            col = 0;
            if row % 4 == 0 {
                word += cols / 3;
            }
        }
    }
    let mut new_result = result.iter().map(|w| number_map(w)).collect::<String>();
    if rows > 4 {
        let mut x = 3;
        while x < rows - 1 {
            new_result.insert(x, ',');
            x += 4;
        }
    }
    Ok(new_result)
}

fn grid_stats(input: &str) -> (usize, usize) {
    let grid_stats = input
        .split('\n')
        .map(|line| line.len())
        .collect::<Vec<usize>>();

    (grid_stats.len(), grid_stats[0])
}

fn number_map(input: &str) -> char {
    match input {
        " _ | ||_|   " => '0',
        "     |  |   " => '1',
        " _  _||_    " => '2',
        " _  _| _|   " => '3',
        "   |_|  |   " => '4',
        " _ |_  _|   " => '5',
        " _ |_ |_|   " => '6',
        " _   |  |   " => '7',
        " _ |_||_|   " => '8',
        " _ |_| _|   " => '9',
        _ => '?',
    }
}