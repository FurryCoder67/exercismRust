pub struct RailFence {
    rails: usize,
}

impl RailFence {
    pub fn new(rails: u32) -> RailFence {
        RailFence { rails: rails as usize }
    }

    pub fn encode(&self, text: &str) -> String {
    if self.rails == 1 {
        return text.to_string();
    }

    let mut rails = vec![String::new(); self.rails];
    let mut rail = 0;
    let mut dir: isize = 1;

    for c in text.chars() {
        rails[rail].push(c);

        // Move to the next rail
        rail = (rail as isize + dir) as usize;

        // Reverse direction at the top or bottom rail
        if rail == 0 || rail == self.rails - 1 {
            dir *= -1;
        }
    }

    rails.concat()
}

    pub fn decode(&self, cipher: &str) -> String {
        if self.rails == 1 {
            return cipher.to_string();
        }

        let len = cipher.len();
        let mut pattern = Vec::with_capacity(len);
        let mut rail = 0;
        let mut dir = 1;

        for _ in 0..len {
            pattern.push(rail);
            rail = (rail as isize + dir) as usize;
            if rail == 0 || rail == self.rails - 1 {
                dir *= -1;
            }
        }

        let mut rail_lengths = vec![0; self.rails];
        for &r in &pattern {
            rail_lengths[r] += 1;
        }

        let mut rails: Vec<Vec<char>> = Vec::with_capacity(self.rails);
        let mut chars = cipher.chars();
        for &len in &rail_lengths {
            rails.push(chars.by_ref().take(len).collect());
        }

        let mut result = String::with_capacity(len);
        let mut rail_positions = vec![0; self.rails];
        for &r in &pattern {
            result.push(rails[r][rail_positions[r]]);
            rail_positions[r] += 1;
        }

        result
    }
}