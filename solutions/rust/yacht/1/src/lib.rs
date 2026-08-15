#[derive(Debug)]
pub enum Category {
    Ones,
    Twos,
    Threes,
    Fours,
    Fives,
    Sixes,
    FullHouse,
    FourOfAKind,
    LittleStraight,
    BigStraight,
    Choice,
    Yacht,
}

type Dice = [u8; 5];

pub fn score(dice: Dice, category: Category) -> u8 {
    let mut counts = [0; 6];
    for &d in &dice {
        counts[(d - 1) as usize] += 1;
    }

    match category {
        Category::Ones => counts[0],
        Category::Twos => counts[1] * 2,
        Category::Threes => counts[2] * 3,
        Category::Fours => counts[3] * 4,
        Category::Fives => counts[4] * 5,
        Category::Sixes => counts[5] * 6,
        Category::FullHouse => {
            if counts.contains(&3) && counts.contains(&2) {
                dice.iter().sum()
            } else {
                0
            }
        }
        Category::FourOfAKind => {
            for (i, &count) in counts.iter().enumerate() {
                if count >= 4 {
                    return ((i + 1) * 4) as u8;
                }
            }
            0
        }
        Category::LittleStraight => {
            let mut sorted = dice;
            sorted.sort();
            if sorted == [1, 2, 3, 4, 5] {
                30
            } else {
                0
            }
        }
        Category::BigStraight => {
            let mut sorted = dice;
            sorted.sort();
            if sorted == [2, 3, 4, 5, 6] {
                30
            } else {
                0
            }
        }
        Category::Choice => dice.iter().sum(),
        Category::Yacht => {
            if counts.iter().any(|&c| c == 5) {
                50
            } else {
                0
            }
        }
    }
}