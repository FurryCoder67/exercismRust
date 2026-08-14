pub fn spiral_matrix(size: u32) -> Vec<Vec<u32>> {
    let mut matrix = vec![vec![0; size as usize]; size as usize];
    let mut x = 0usize;
    let mut y = 0usize;
    let mut d = Direction::Right;
    for i in 1..=size * size {
        matrix[y][x] = i;
        next(&matrix, size as usize, &mut x, &mut y, &mut d);
    }
    matrix
}

enum Direction {
    Right,
    Down,
    Left,
    Up,
}

fn next(matrix: &Vec<Vec<u32>>, size: usize, x: &mut usize, y: &mut usize, d: &mut Direction) {
    match d {
        Direction::Right => {
            if *x == size - 1 || matrix[*y][*x + 1] > 0 {
                *d = Direction::Down;
                *y += 1;
            } else {
                *x += 1;
            }
        }
        Direction::Down => {
            if *y == size - 1 || matrix[*y + 1][*x] > 0 {
                *d = Direction::Left;
                *x -= 1;
            } else {
                *y += 1;
            }
        }
        Direction::Left => {
            if *x == 0 || matrix[*y][*x - 1] > 0 {
                *d = Direction::Up;
                *y -= 1;
            } else {
                *x -= 1;
            }
        }
        Direction::Up => {
            if *y == 0 || matrix[*y - 1][*x] > 0 {
                *d = Direction::Right;
                *x += 1;
            } else {
                *y -= 1;
            }
        }
    }
}