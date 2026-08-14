pub fn egg_count(mut display_value: u32) -> usize {
    let mut sum = 0;
    while display_value != 0 {
        sum += display_value & 1;
        display_value = display_value >> 1;
    }
    sum as usize
}