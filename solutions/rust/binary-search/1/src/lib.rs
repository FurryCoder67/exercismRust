pub fn find(a: &[i32], v: i32) -> Option<usize> {
    let m = a.len() / 2;
    match a.get(m)? {
        mv if *mv == v => Some (m),
        mv if *mv > v  => find(&a[..m], v),
        _              => find(&a[m + 1..], v).map(|i| i + m + 1)
    }
}