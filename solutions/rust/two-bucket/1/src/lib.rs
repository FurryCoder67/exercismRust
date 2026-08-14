use std::collections::VecDeque;

#[derive(PartialEq, Eq, Debug)]
pub enum Bucket {
    One,
    Two,
}

/// A struct to hold your results in.
#[derive(PartialEq, Eq, Debug)]
pub struct BucketStats {
    /// The total number of "moves" it should take to reach the desired number of liters, including
    /// the first fill.
    pub moves: u8,
    /// Which bucket should end up with the desired number of liters? (Either "one" or "two")
    pub goal_bucket: Bucket,
    /// How many liters are left in the other bucket?
    pub other_bucket: u8,
}

#[derive(PartialEq, Eq, Debug)]
enum Move {
    FillOne,
    FillTwo,
    EmptyOne,
    EmptyTwo,
    PourToOne,
    PourToTwo,
}

fn next_moves(pre: Move, is_one_full: bool, is_two_full: bool) -> Vec<Move> {
    use Move::*;
    match (pre, is_one_full, is_two_full) {
        (FillOne, _, _) => vec![FillTwo, EmptyTwo, PourToTwo],
        (FillTwo, _, _) => vec![FillOne, EmptyOne, PourToOne],
        (EmptyOne, _, _) => vec![PourToOne],
        (EmptyTwo, _, _) => vec![PourToTwo],
        (PourToOne, true, _) => vec![EmptyOne, PourToTwo],
        (PourToOne, false, _) => vec![FillTwo, PourToTwo],
        (PourToTwo, _, true) => vec![EmptyTwo, PourToOne],
        (PourToTwo, _, false) => vec![FillOne, PourToOne],
    }
}

fn apply_move(
    next_move: &Move,
    amount_1: u8,
    amount_2: u8,
    capacity_1: u8,
    capacity_2: u8,
) -> (u8, u8) {
    match next_move {
        Move::FillOne => (capacity_1, amount_2),
        Move::FillTwo => (amount_1, capacity_2),
        Move::EmptyOne => (0, amount_2),
        Move::EmptyTwo => (amount_1, 0),
        Move::PourToOne => {
            let pour = std::cmp::min(capacity_1 - amount_1, amount_2);
            (amount_1 + pour, amount_2 - pour)
        }
        Move::PourToTwo => {
            let pour = std::cmp::min(capacity_2 - amount_2, amount_1);
            (amount_1 - pour, amount_2 + pour)
        }
    }
}

/// Solve the bucket problem
pub fn solve(
    capacity_1: u8,
    capacity_2: u8,
    goal: u8,
    start_bucket: &Bucket,
) -> Option<BucketStats> {
    if (goal > capacity_1 && goal > capacity_2) || goal % gcd(capacity_1, capacity_2) > 0 {
        return None;
    }
    let mut queue: VecDeque<(u8, u8, u8, Move)> = VecDeque::new();
    match start_bucket {
        Bucket::One => queue.push_back((capacity_1, 0, 1, Move::FillOne)),
        Bucket::Two => queue.push_back((0, capacity_2, 1, Move::FillTwo)),
    }
    while let Some((amount_1, amount_2, step, pre)) = queue.pop_front() {
        if amount_1 == goal {
            return Some(BucketStats {
                moves: step,
                goal_bucket: Bucket::One,
                other_bucket: amount_2,
            });
        }
        if amount_2 == goal {
            return Some(BucketStats {
                moves: step,
                goal_bucket: Bucket::Two,
                other_bucket: amount_1,
            });
        }
        let is_one_full = amount_1 == capacity_1;
        let is_two_full = amount_2 == capacity_2;
        for next_move in next_moves(pre, is_one_full, is_two_full) {
            let (res_amount_1, res_amount_2) =
                apply_move(&next_move, amount_1, amount_2, capacity_1, capacity_2);
            if (start_bucket == &Bucket::Two && amount_1 == capacity_1 && amount_2 == 0)
                || (start_bucket == &Bucket::One && amount_1 == 0 && amount_2 == capacity_2)
            {
                continue;
            }
            queue.push_back((res_amount_1, res_amount_2, step + 1, next_move));
        }
    }
    None
}

fn gcd(a: u8, b: u8) -> u8 {
    if a == b {
        return a;
    }
    if a == 0 {
        return b;
    }
    if b == 0 {
        return a;
    }

    match (a % 2 == 1, b % 2 == 1) {
        (false, false) => 2 * gcd(a / 2, b / 2),
        (true, false) => gcd(a, b / 2),
        (false, true) => gcd(a / 2, b),
        (true, true) => {
            let (s, l) = if a > b { (b, a) } else { (a, b) };
            gcd((l - s) / 2, s)
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_gcd() {
        assert_eq!(1, gcd(3, 5));
    }

    #[test]
    fn test_gcd_2() {
        assert_eq!(1, gcd(2, 3));
    }
}