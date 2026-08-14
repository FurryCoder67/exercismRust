/// What should the type of _function be?
pub fn map<T, U>(input: Vec<T>, mut f: impl FnMut(T) -> U) -> Vec<U> {
    let iter = input.into_iter();
    let mut res = Vec::with_capacity(iter.size_hint().0);
    for x in iter {
        res.push(f(x));
    }
    res
}