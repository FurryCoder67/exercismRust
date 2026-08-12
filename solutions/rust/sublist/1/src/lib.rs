#[derive(Debug, PartialEq, Eq)]
pub enum Comparison {
    Equal,
    Sublist,
    Superlist,
    Unequal,
}

pub fn sublist(first_list: &[i32], second_list: &[i32]) -> Comparison {
    if first_list == second_list {
        return Comparison::Equal;
    }

    if first_list.is_empty() {
        return Comparison::Sublist;
    }

    if second_list.is_empty() {
        return Comparison::Superlist;
    }

    if first_list.len() > second_list.len() 
        && first_list.windows(second_list.len()).any(|w| w == second_list) {
        return Comparison::Superlist;
    }

    if second_list.len() > first_list.len() 
        && second_list.windows(first_list.len()).any(|w| w == first_list) {
        return Comparison::Sublist;
    }

    Comparison::Unequal
}   