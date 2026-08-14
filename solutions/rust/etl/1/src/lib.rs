use std::collections::BTreeMap;

pub fn transform(h: &BTreeMap<i32, Vec<char>>) -> BTreeMap<char, i32> {
    h.iter().fold(BTreeMap::new(), |mut res, (&score, cs)| {
        res.extend(cs.iter().map(|c| (c.to_ascii_lowercase(), score)));
        res
    })
}