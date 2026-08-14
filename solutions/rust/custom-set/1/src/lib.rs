use std::{collections::HashSet, fmt::Debug, hash::Hash};

#[derive(Debug, PartialEq, Eq, Clone)]
pub struct CustomSet<T: Debug + PartialEq + Eq + Hash>(HashSet<T>);

impl<T> CustomSet<T>
where
    T: Debug + PartialEq + Eq + Hash + Clone + Copy,
{
    pub fn new(input: &[T]) -> Self {
        Self(input.iter().copied().collect())
    }

    pub fn contains(&self, element: &T) -> bool {
        self.0.contains(element)
    }

    pub fn add(&mut self, element: T) {
        self.0.insert(element);
    }

    pub fn is_subset(&self, other: &Self) -> bool {
        for elem in self.0.iter() {
            if !other.contains(elem) {
                return false;
            }
        }
        true
    }

    pub fn is_empty(&self) -> bool {
        self.0.is_empty()
    }

    pub fn is_disjoint(&self, other: &Self) -> bool {
        for elem in self.0.iter() {
            if other.contains(elem) {
                return false;
            }
        }
        true
    }

    #[must_use]
    pub fn intersection(&self, other: &Self) -> Self {
        let mut set = HashSet::new();
        for elem in self.0.iter() {
            if other.contains(elem) {
                set.insert(*elem);
            }
        }
        Self(set)
    }

    #[must_use]
    pub fn difference(&self, other: &Self) -> Self {
        let mut set = self.clone();
        for elem in self.intersection(other).0 {
            set.0.remove(&elem);
        }
        set
    }

    #[must_use]
    pub fn union(&self, other: &Self) -> Self {
        let mut set = self.0.clone();
        set.extend(other.0.iter().copied());
        Self(set)
    }
}