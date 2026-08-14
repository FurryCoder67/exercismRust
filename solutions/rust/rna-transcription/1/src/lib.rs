#[derive(Debug, PartialEq)]
pub struct Dna {
    dna: String,
}

const VALID_DNA_CHARS: [char; 4] = ['A', 'C','G', 'T'];

#[derive(Debug, PartialEq)]
pub struct Rna {
    rna: String,
}

const VALID_RNA_CHARS: [char; 4] = ['U', 'G', 'C', 'A'];

impl Dna {
    pub fn new(dna: &str) -> Result<Dna, usize> {
        match dna.chars().position(|c| !VALID_DNA_CHARS.contains(&c)) {
            Some(index) => Err(index),
            None => Ok(Dna {
                dna: dna.to_string(),
            }),
        }
    }

    pub fn into_rna(self) -> Rna {
        let rna: String = self
            .dna
            .chars()
            .flat_map(|c| VALID_RNA_CHARS.get(VALID_DNA_CHARS.binary_search(&c).ok().unwrap()))
            .collect();
        Rna { rna }
    }
}

impl Rna {
    pub fn new(rna: &str) -> Result<Rna, usize> {
        match rna.chars().position(|c| !VALID_RNA_CHARS.contains(&c)) {
            Some(index) => Err(index),
            None => Ok(Rna {
                rna: rna.to_string(),
            }),
        }
    }
}