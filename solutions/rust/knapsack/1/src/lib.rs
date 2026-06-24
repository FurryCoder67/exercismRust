#[derive(Clone)]
pub struct Item {
    pub weight: u32,
    pub value: u32,
}

pub fn maximum_value(max_weight: u32, items: &[Item]) -> u32 {
    let max_weight = max_weight as usize;
    let mut dp = vec![0; max_weight + 1];

    for item in items {
        let w_item = item.weight as usize;
        let v_item = item.value;
        for w in (w_item..=max_weight).rev() {
            dp[w] = dp[w].max(dp[w - w_item] + v_item);
        }
    }

    dp[max_weight]
}
