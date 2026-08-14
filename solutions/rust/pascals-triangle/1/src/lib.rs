pub struct PascalsTriangle{
    rows: u32,
}

impl PascalsTriangle {
    pub fn new(row_count: u32) -> Self {
        // todo!("create Pascal's triangle with {row_count} rows");
        Self{
            rows: row_count,
        }
    }
    pub fn ncr(&self, n:u32, r:u32) ->u32{
        // n! / (r!)*(n-r!)
        let mut n_fact = 1;
        let mut r_fact = 1;
        let mut nr_fact = 1;
        for i in 1..=n{
            n_fact *=i;
        }
        for i in 1..=r{
            r_fact *= i;
        }
        for i in 1..=(n-r){
            nr_fact *= i;
        }
        return n_fact/(r_fact*nr_fact);

        
    }
    pub fn rows(&self) -> Vec<Vec<u32>> {
        // todo!();
        let num_rows = self.rows;
        let mut ans:Vec<Vec<u32>> = Vec::new();
        for i in 1..=num_rows{
            let mut vec =Vec::new();
            for j in 0..i{
                vec.push(self.ncr(i-1,j));
            }
            // if i != 1{
            //     vec.push(1);
            // }
            
            ans.push(vec);
        }
        return ans;
    }
}
/*1
1 2 1 -> ith row jth print iCj = i! / (j!)*(i-j)!
1 3 3 1

*/