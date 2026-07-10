#[derive(Debug, PartialEq, Eq)]
pub enum Classification {
    Abundant,
    Perfect,
    Deficient,
}

pub fn classify(num: u64) -> Option<Classification> {
    if num == 0 {
        return None;
    }
    let aliquot_sum: u64 = (1..=num / 2)
        .filter(|&index| num % index == 0)
        .sum();
    if aliquot_sum == num {
        Some(Classification::Perfect)
    } else if aliquot_sum > num {
        Some(Classification::Abundant)
    } else {
        Some(Classification::Deficient)
    }
}