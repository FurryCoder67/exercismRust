fn is_prime(num: u64) -> bool {
    if num <= 1 { 
        return false; 
    }
    for i in 2.. {
        if i * i > num {
            break;
        }
        if num % i == 0 { 
            return false; 
        }
    }
    true
}
pub fn nth(n: u32) -> u32 {
    let mut arr = vec![];
    let mut i: u64 = 0;
    while arr.len() <= n as usize { 
        if is_prime(i) {
            arr.push(i);
        }
        i += 1;
    }
    arr[n as usize] as u32
}
