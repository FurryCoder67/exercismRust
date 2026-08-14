#[derive(Debug, PartialEq, Eq)]
pub enum Error {
    NotEnoughPinsLeft,
    GameComplete,
}

// Each frame contains covered rolls indexes
#[derive(Debug, Clone, Copy)]
enum Frame {
    Regular(usize, usize),                  
    NotCompleted(usize),                    
    Strike(usize),                          
    Spare(usize, usize),                    
    LastNotCompleted(usize),                    
    LastExtNotCompleted(usize, usize),      
    LastExt(usize, usize, usize)
}
use Frame::*;

impl Frame {
    fn is_completed(&self) -> bool {
        ! matches!(self, NotCompleted(_) | LastNotCompleted(_) | LastExtNotCompleted(_, _))
    }
}

// We need both frames and rolls lists, because we need to refer to "next 1..2 rolls", regardless of frames
pub struct BowlingGame {
    frames: Vec<Frame>,
    rolls: Vec<u16>
}

impl BowlingGame {
    pub fn new() -> Self {
        BowlingGame { frames: Vec::new(), rolls: Vec::new()  }
    }

    fn is_completed(&self) -> bool {
        self.frames.get(9).map_or(false, |f| f.is_completed())
    }

    pub fn roll(&mut self, pins: u16) -> Result<(), Error> {
        if self.is_completed() { return Err(Error::GameComplete) }
        if pins > 10 { return Err(Error::NotEnoughPinsLeft) }
        
        // Register the roll
        let ndx = self.rolls.len();
        self.rolls.push(pins);
        let get_pins = |ndx| *self.rolls.get(ndx).unwrap_or(&0);

        if self.frames.last().map_or(true, |f| f.is_completed()) {
            // New frame started
            self.frames.push(match (pins, self.frames.len()) {
                ( _, 9) => LastNotCompleted(ndx),
                (10, _) => Strike(ndx),
                ( _, _) => NotCompleted(ndx)
            })
        } else {
            // Existing frame to update
            let pins_left = match *self.frames.last().unwrap() {
                NotCompleted(i1) => { let p1 = get_pins(i1); 10 - p1 },
                LastNotCompleted(i1) => { let p1 = get_pins(i1); if p1 == 10 { 10 } else { 10 - p1 } },
                LastExtNotCompleted(i1, i2) => { let (p1, p2) = (get_pins(i1), get_pins(i2)); if p2 == 10 || p1 + p2 == 10 { 10 } else { 10 - p2 } },
                _ => panic!("Unexpected frame")
            };
            if pins > pins_left { return Err(Error::NotEnoughPinsLeft) };

            let upd_frame = match self.frames.pop().unwrap() {
                NotCompleted(i1) if get_pins(i1) + pins == 10 => Spare(i1, ndx),
                NotCompleted(i1) => Regular(i1, ndx),
                LastNotCompleted(i1) => { let p1 = get_pins(i1); if p1 == 10 || p1 + pins == 10 { LastExtNotCompleted(i1, ndx) } else { Regular(i1, ndx) } },
                LastExtNotCompleted(i1, i2) => LastExt(i1, i2, ndx),
                _ => panic!("Unexpected frame")
            };
            self.frames.push(upd_frame);
        }
        Ok(())
    }

    pub fn score(&self) -> Option<u16> {
        if !self.is_completed() { return None };
        let pins = |ndx| *self.rolls.get(ndx).unwrap_or(&0);
        Some(self.frames.iter().map(|&f| {
            match f {
                Regular(i1, i2)          => pins(i1) + pins(i2),
                Spare(i1, i2)            => pins(i1) + pins(i2) + pins(i2 + 1),
                Strike(i)                => 10 + pins(i + 1) + pins(i + 2),
                LastExt(i1, i2, i3)      => pins(i1) + pins(i2) + pins(i3),
                _ => panic!("Unexpected frame")
            }
        }).sum())
    }
}