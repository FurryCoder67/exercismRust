#[derive(Debug)]
pub struct ChessPosition {
    rank: i32,
    file: i32,
}

#[derive(Debug)]
pub struct Queen {
    position: ChessPosition,
}

impl ChessPosition {
    pub fn new(rank: i32, file: i32) -> Option<Self> {
        match (rank, file) {
            (0..=7, 0..=7) => Some(Self { rank, file }),
            _ => None,
        }
    }
}

impl Queen {
    pub fn new(position: ChessPosition) -> Self {
        Self { position }
    }

    pub fn can_attack(&self, other: &Queen) -> bool {
        let ChessPosition { rank: x1, file: y1 } = self.position;
        let ChessPosition { rank: x2, file: y2 } = other.position;
        x1 == x2 || y1 == y2 || x1 + y2 == x2 + y1 || x1 + y1 == x2 + y2
    }
}