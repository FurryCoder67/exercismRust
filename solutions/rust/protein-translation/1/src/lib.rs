pub fn translate(rna: &str) -> Option<Vec<&str>> {
    let mut names = Vec::with_capacity(rna.len() / 3);

    for codon in rna.as_bytes().chunks(3) {
        let name = match codon {
            b"AUG" => "Methionine",
            b"UUU" | b"UUC" => "Phenylalanine",
            b"UUA" | b"UUG" => "Leucine",
            b"UCU" | b"UCC" | b"UCA" | b"UCG" => "Serine",
            b"UAU" | b"UAC" => "Tyrosine",
            b"UGU" | b"UGC" => "Cysteine",
            b"UGG" => "Tryptophan",
            b"UAA" | b"UAG" | b"UGA" => return Some(names),
            _ => return None,
        };
        names.push(name);
    }
    Some(names)
}