use anyhow::Error;
use std::borrow::Cow;
use std::fs::File;
use std::io::{BufRead, BufReader};
/// While using `&[&str]` to handle flags is convenient for exercise purposes,
/// and resembles the output of [`std::env::args`], in real-world projects it is
/// both more convenient and more idiomatic to contain runtime configuration in
/// a dedicated struct. Therefore, we suggest that you do so in this exercise.
///
/// In the real world, it's common to use crates such as [`clap`] or
/// [`structopt`] to handle argument parsing, and of course doing so is
/// permitted in this exercise as well, though it may be somewhat overkill.
///
/// [`clap`]: https://crates.io/crates/clap
/// [`std::env::args`]: https://doc.rust-lang.org/std/env/fn.args.html
/// [`structopt`]: https://crates.io/crates/structopt
#[derive(Debug, Default)]
pub struct Flags {
    line_numbers: bool,
    filenames_only: bool,
    case_insensitive: bool,
    inverted: bool,
    must_match_full_line: bool,
}

impl Flags {
    pub fn new(flags: &[&str]) -> Self {
        let mut result = Self::default();
        for &f in flags {
            match f {
                "-n" => result.line_numbers = true,
                "-l" => result.filenames_only = true,
                "-i" => result.case_insensitive = true,
                "-v" => result.inverted = true,
                "-x" => result.must_match_full_line = true,
                _ => panic!("Unsupported flag"),
            }
        }
        result
    }
}

pub fn grep(pattern: &str, flags: &Flags, files: &[&str]) -> Result<Vec<String>, Error> {
    let mut out = Vec::new();
    let mut pattern = Cow::Borrowed(pattern);
    if flags.case_insensitive {
        *pattern.to_mut() = pattern.to_lowercase();
    }
    let pattern = match pattern {
        Cow::Owned(ref s) => s.as_str(),
        Cow::Borrowed(s) => s,
    };
    for filename in files.iter() {
        let file = BufReader::new(File::open(filename)?);
        for (i, line) in file.lines().enumerate() {
            let line = line?;
            dbg!(&line);
            dbg!(&pattern);
            let mut is_match = {
                match (flags.must_match_full_line, flags.case_insensitive) {
                    (true, true) => line.to_lowercase() == pattern,
                    (true, false) => line == pattern,
                    (false, true) => line.to_lowercase().contains(&pattern),
                    (false, false) => line.contains(&pattern),
                }
            };
            dbg!(is_match);
            if flags.inverted {
                is_match = !is_match
            };
            if !is_match {
                continue;
            }
            let mut line_out = String::with_capacity(line.len());
            if flags.filenames_only {
                out.push(filename.to_string());
                break;
            }
            if files.len() > 1 {
                line_out += filename;
                line_out.push(':');
            }
            if flags.line_numbers {
                line_out += &format!("{}:", i + 1);
            }
            line_out += line.as_str();
            out.push(line_out);
        }
    }
    Ok(out)
}