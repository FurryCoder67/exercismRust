pub struct Triangle<T> {
    ordered_sides: [T; 3],
}

impl<T: PartialOrd + Clone + Copy + std::ops::Add<Output = T>> Triangle<T> {
    pub fn build(sides: [T; 3]) -> Option<Triangle<T>> {
        let mut ordered_sides: [T; 3] = sides.clone();
        ordered_sides.sort_by(|a, b| a.partial_cmp(b).unwrap());
        if ordered_sides[0] + ordered_sides[1] > ordered_sides[2] {
            Some(Self { ordered_sides })
        } else {
            None
        }
    }

    pub fn is_equilateral(&self) -> bool {
        self.ordered_sides[0] == self.ordered_sides[1]
            && self.ordered_sides[0] == self.ordered_sides[2]
    }

    pub fn is_scalene(&self) -> bool {
        self.ordered_sides[0] != self.ordered_sides[1]
            && self.ordered_sides[1] != self.ordered_sides[2]
    }

    pub fn is_isosceles(&self) -> bool {
        self.ordered_sides[0] == self.ordered_sides[1]
            || self.ordered_sides[1] == self.ordered_sides[2]
    }
}