use std::borrow::Borrow;
use std::io::{Read, Write};
use std::iter::Cycle;
use std::slice::Iter;

pub trait Captures<'a> {}
impl<'a, T: ?Sized> Captures<'a> for T {}

/// A munger which XORs a key with some data
#[derive(Clone)]
pub struct Xorcism<'a> {
    key: Cycle<Iter<'a, u8>>,
}

impl<'a> Xorcism<'a> {
    /// Create a new Xorcism munger from a key
    ///
    /// Should accept anything which has a cheap conversion to a byte slice.
    pub fn new<Key: AsRef<[u8]> + ?Sized>(key: &'a Key) -> Xorcism<'a> {
        Self {
            key: key.as_ref().iter().cycle(),
        }
    }

    /// XOR each byte of the input buffer with a byte from the key.
    ///
    /// Note that this is stateful: repeated calls are likely to produce different results,
    /// even with identical inputs.
    pub fn munge_in_place(&mut self, data: &mut [u8]) {
        data.iter_mut()
            .zip(&mut self.key)
            .for_each(|(x, k)| *x ^= k);
    }

    /// XOR each byte of the data with a byte from the key.
    ///
    /// Note that this is stateful: repeated calls are likely to produce different results,
    /// even with identical inputs.
    ///
    /// Should accept anything which has a cheap conversion to a byte iterator.
    /// Shouldn't matter whether the byte iterator's values are owned or borrowed.
    pub fn munge<'b, Data>(&'b mut self, data: Data) -> impl Iterator<Item = u8> + 'b + Captures<'a>
    where
        Data: 'b + IntoIterator,
        Data::Item: Borrow<u8>,
    {
        data.into_iter()
            .zip(&mut self.key)
            .map(|(x, k)| x.borrow() ^ k)
    }

    pub fn reader(self, reader: impl Read + 'a) -> impl Read + 'a {
        XorcismReader {
            xorcism: self,
            reader,
        }
    }

    pub fn writer(self, writer: impl Write + 'a) -> impl Write + 'a {
        XorcismWriter {
            xorcism: self,
            writer,
        }
    }
}

struct XorcismReader<'a, R: Read> {
    xorcism: Xorcism<'a>,
    reader: R,
}

impl<'a, R: Read> Read for XorcismReader<'a, R> {
    fn read(&mut self, buf: &mut [u8]) -> std::io::Result<usize> {
        self.reader.read(buf).map(|n| {
            self.xorcism.munge_in_place(&mut buf[..n]);
            n
        })
    }
}

struct XorcismWriter<'a, W: Write> {
    xorcism: Xorcism<'a>,
    writer: W,
}

impl<'a, W: Write> Write for XorcismWriter<'a, W> {
    fn write(&mut self, buf: &[u8]) -> std::io::Result<usize> {
        self.xorcism
            .munge(buf)
            .try_fold(0, |acc, b| self.writer.write(&[b]).map(|n| acc + n))
    }

    fn flush(&mut self) -> std::io::Result<()> {
        self.writer.flush()
    }
}