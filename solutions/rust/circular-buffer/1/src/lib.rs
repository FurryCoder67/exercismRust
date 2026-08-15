#[derive(Default)]
pub struct CircularBuffer<T> {
    elements: Vec<Option<T>>,
    write_idx: usize,
    read_idx: usize,
}

#[derive(Debug, PartialEq)]
pub enum Error {
    EmptyBuffer,
    FullBuffer,
}

impl<T: Clone + Default> CircularBuffer<T> {
    pub fn new(capacity: usize) -> Self {
        Self {
            elements: vec![None; capacity],
            ..Default::default()
        }
    }

    pub fn write(&mut self, element: T) -> Result<(), Error> {
        match self.is_full() {
            true => Err(Error::FullBuffer),
            false => {
                self.elements[self.write_idx] = Some(element);
                self.write_idx = self.increment_idx(self.write_idx);
                Ok(())
            }
        }
    }

    pub fn read(&mut self) -> Result<T, Error> {
        match self.elements[self.read_idx].take() {
            Some(v) => {
                self.read_idx = self.increment_idx(self.read_idx);
                Ok(v)
            }
            None => Err(Error::EmptyBuffer),
        }
    }

    pub fn clear(&mut self) {
        self.elements = vec![None; self.elements.len()]
    }

    pub fn overwrite(&mut self, element: T) {
        if self.is_full() {
            self.read_idx = self.increment_idx(self.read_idx);
        }
        
        self.elements[self.write_idx] = Some(element);
        self.write_idx = self.increment_idx(self.write_idx)
    }

    fn is_full(&self) -> bool {
        self.elements[self.write_idx].is_some()
    }

    fn increment_idx(&self, idx: usize) -> usize {
        (idx + 1) % self.elements.len()
    }
}