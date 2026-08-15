use Category::*;
use std::collections::HashMap;

type Rank = u8;
const J: Rank = 11;
const Q: Rank = 12;
const K: Rank = 13;
const A: Rank = 14;

#[derive(Debug, PartialEq, Eq, PartialOrd, Ord)]
enum Category {
    HighestKind(Vec<Rank>),
    OnePair(Rank, Vec<Rank>),
    TwoPair(Rank, Rank, Vec<Rank>),
    ThreeOfAKind(Rank, Vec<Rank>),
    Straight(Rank),
    Flush(Vec<Rank>),
    FullHouse(Rank, Rank),
    FourOfAKind(Rank, Rank),
    StraightFlush(Rank),
}

fn rank(s: &str) -> Rank {
    match &s[..s.len() - 1] {
        "J" => J,
        "Q" => Q,
        "K" => K,
        "A" => A,
        s => s.parse().unwrap(),
    }
}

fn category(hand: &str) -> Category {
    // cards == vec!["AH", "3S", "3D", "2C", "AC"]
    let cards: Vec<&str> = hand.split_whitespace().collect();
    // cards -> ranks == vec![A, 3, 3, 2, A] -> later sorted [A, A, 3, 3, 2]
    let mut ranks: Vec<Rank> = cards.iter().copied().map(rank).collect();
    // ranks -> cnts -> {A => 2, 3 => 2, 2 => 1}
    let mut cnts = HashMap::new();
    for &rank in ranks.iter() {
        *cnts.entry(rank).or_insert(0) += 1;
    }

    if cnts.len() == 2 {
        let xs: Vec<(Rank, usize)> = cnts.iter().map(|(&r, &c)| (r, c)).collect();
        match (xs[0], xs[1]) {
            ((a, 4), (b, 1)) => return FourOfAKind(a, b),
            ((a, 1), (b, 4)) => return FourOfAKind(b, a),
            ((a, 3), (b, 2)) => return FullHouse(a, b),
            ((a, 2), (b, 3)) => return FullHouse(b, a),
            _ => (),
        }
    }

    ranks.sort_unstable_by(|a, b| b.cmp(a));
    let suit1 = cards[0].chars().last();
    let same_suit = cards[1..].iter().all(|c| c.chars().last() == suit1);
    if cnts.len() == 5 {
        if ranks[0] - ranks[4] == 4 {
            return if same_suit {
                StraightFlush(ranks[0])
            } else {
                Straight(ranks[0])
            };
        } else if ranks[0] == A && ranks[1] == 5 && ranks[4] == 2 {
            return if same_suit {
                StraightFlush(5)
            } else {
                Straight(5)
            }; // A5432
        }
    }

    if same_suit {
        return Flush(ranks);
    }

    // cnts -> occ == {2 => vec![A, 3], 1 => vec![1]}
    let mut occ: HashMap<usize, Vec<Rank>> = HashMap::new();
    for (key, value) in cnts {
        occ.entry(value).or_default().push(key);
    }
    if let Some(values) = occ.get_mut(&1) {
        values.sort_unstable_by(|a, b| b.cmp(a));
    }
    match occ.iter().max().map(|(n, rs)| (n, &rs[..])) {
        Some((3, &[r])) => ThreeOfAKind(r, ranks),
        Some((2, &[a, b])) => TwoPair(a.max(b), a.min(b), ranks),
        Some((2, &[r])) => OnePair(r, occ[&1].to_vec()),
        _ => HighestKind(ranks),
    }
}

pub fn winning_hands<'a>(hands: &[&'a str]) -> Vec<&'a str> {
    let categories: Vec<_> = hands.iter().copied().map(category).collect();
    let m = categories.iter().max().unwrap();
    hands
        .iter()
        .zip(&categories)
        .filter_map(|(&h, c)| (c == m).then_some(h))
        .collect()
}