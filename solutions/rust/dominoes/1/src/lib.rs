type Domino = (u8, u8);

pub fn chain(input: &[Domino]) -> Option<Vec<Domino>> {
    if input.is_empty() {
        return Some(vec![]);
    }

    let mut dominoes = input.to_vec();
    let d = dominoes[0];

    if let Some(mut chain) = build_chain(&mut dominoes[1..], d.1, d.0) {
        chain.insert(0, d);

        return Some(chain);
    }

    None
}

fn build_chain(dominoes: &mut [Domino], start: u8, end: u8) -> Option<Vec<Domino>> {
    if dominoes.is_empty() && start == end {
        return Some(vec![]);
    }

    for i in 0..dominoes.len() {
        if dominoes[i].1 == start {
            dominoes[i] = (dominoes[i].1, dominoes[i].0);
        }

        if dominoes[i].0 != start {
            continue;
        }

        dominoes.swap(0, i);

        let d = dominoes[0];

        if let Some(mut chain) = build_chain(&mut dominoes[1..], d.1, end) {
            chain.insert(0, d);

            return Some(chain);
        }
    }

    None
}