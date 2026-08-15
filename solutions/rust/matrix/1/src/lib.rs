pub struct Matrix {
    data: Vec<Vec<u32>>,
}

impl Matrix {
    pub fn new(input: &str) -> Self {
        let data = input
            .lines()
            .map(|line| {
                line.split_whitespace()
                    .map(|num| num.parse::<u32>().unwrap())
                    .collect()
            })
            .collect();
        Matrix { data }
    }

    pub fn row(&self, row_no: usize) -> Option<Vec<u32>> {
        self.data.get(row_no - 1).cloned()
    }

    pub fn column(&self, col_no: usize) -> Option<Vec<u32>> {
        if self.data.is_empty() || col_no == 0 || col_no > self.data[0].len() {
            return None;
        }
        Some(self.data.iter().map(|row| row[col_no - 1]).collect())
    }
}