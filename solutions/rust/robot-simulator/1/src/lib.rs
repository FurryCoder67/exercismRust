use core::panic;

// The code below is a stub. Just enough to satisfy the compiler.
// In order to pass the tests you can add-to or change any of this code.

#[derive(PartialEq, Debug)]
pub enum Direction {
    North = 0,
    East = 1,
    South = 2,
    West = 3,
}

pub struct Robot {
    x: i32,
    y: i32,
    d: Direction,
}

impl Robot {
    pub fn new(x: i32, y: i32, d: Direction) -> Self {
        Self { x, y, d }
    }

    pub fn turn_right(self) -> Self {
        let new_d = unsafe { std::mem::transmute((self.d as i8 + 1).rem_euclid(4)) };
        Self {
            x: self.x,
            y: self.y,
            d: new_d,
        }
    }

    pub fn turn_left(self) -> Self {
        let new_d = unsafe { std::mem::transmute((self.d as i8 - 1).rem_euclid(4)) };
        Self {
            x: self.x,
            y: self.y,
            d: new_d,
        }
    }

    pub fn advance(self) -> Self {
        let mut x = self.x;
        let mut y = self.y;
        match &self.d {
            Direction::North => y += 1,
            Direction::East => x += 1,
            Direction::South => y -= 1,
            Direction::West => x -= 1,
        }
        Self { x, y, d: self.d }
    }

    pub fn instructions(self, instructions: &str) -> Self {
        instructions.chars().fold(self , |robot, c| match c {
            'A' => robot.advance(),
            'R' => robot.turn_right(),
            'L' => robot.turn_left(),
            _ => panic!(),
        })
    }

    pub fn position(&self) -> (i32, i32) {
        (self.x, self.y)
    }

    pub fn direction(&self) -> &Direction {
        &self.d
    }
}