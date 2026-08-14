pub fn answer(command: &str) -> Option<i32> {
    let words = command.split([' ', '?']).skip(2).filter(|s| !s.is_empty());
    let mut words = words.map(|word| word.parse::<i32>().map_err(|_| word));
    let mut fst = words.next()?.ok()?;
    loop {
        let snd = match (words.next(), fst) {
            (Some(Err(snd)), _) => snd,
            (None, x) => return Some(x),
            _ => return None,
        };
        match snd {
            "plus" => fst += words.next()?.ok()?,
            "minus" => fst -= words.next()?.ok()?,
            "multiplied" => fst *= words.nth(1)?.ok()?,
            "divided" => fst /= words.nth(1)?.ok()?,
            _ => return None,
        }
    }
}