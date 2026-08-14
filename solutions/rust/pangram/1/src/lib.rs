/// Determine whether a sentence is a pangram.
pub fn is_pangram(sentence: &str) -> bool {
    // todo!("Is {sentence} a pangram?");
    let mut frequency = vec![0; 26];
    let sent = sentence.to_lowercase();
    for ch in sent.chars(){
        if ch.is_alphabetic(){
            frequency[((ch as u8) - ('a' as u8)) as usize]+=1;
        }
    }
    for i in 0..26{
        if frequency[i]==0{
            return false;
        }
    }
    return true;
}