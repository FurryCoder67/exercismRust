// this module adds some functionality based on the required implementations
// here like: `LinkedList::pop_back` or `Clone for LinkedList<T>`
// You are free to use anything in it, but it's mainly for the test framework.
mod pre_implemented;

pub struct LinkedList<T>(Vec<T>);

pub struct Cursor<'a, T> {
    pos: usize,
    list: &'a mut Vec<T>,
}

pub struct Iter<'a, T>(Box<dyn Iterator<Item = &'a T> + 'a>);

impl<T> LinkedList<T> {
    pub fn new() -> Self {
        LinkedList(Vec::new())
    }

    // You may be wondering why it's necessary to have is_empty()
    // when it can easily be determined from len().
    // It's good custom to have both because len() can be expensive for some types,
    // whereas is_empty() is almost always cheap.
    // (Also ask yourself whether len() is expensive for LinkedList)
    pub fn is_empty(&self) -> bool {
        self.0.is_empty()
    }

    pub fn len(&self) -> usize {
        self.0.len()
    }

    /// Return a cursor positioned on the front element
    pub fn cursor_front(&mut self) -> Cursor<'_, T> {
        Cursor {
            pos: 0,
            list: &mut self.0,
        }
    }

    /// Return a cursor positioned on the back element
    pub fn cursor_back(&mut self) -> Cursor<'_, T> {
        Cursor {
            pos: if self.0.is_empty() { 0 } else { self.len() - 1 },
            list: &mut self.0,
        }
    }

    /// Return an iterator that moves from front to back
    pub fn iter(&self) -> Iter<'_, T> {
        Iter(Box::new(self.0.iter()))
    }
}

// the cursor is expected to act as if it is at the position of an element
// and it also has to work with and be able to insert into an empty list.
impl<T> Cursor<'_, T> {
    /// Take a mutable reference to the current element
    pub fn peek_mut(&mut self) -> Option<&mut T> {
        self.list.get_mut(self.pos)
    }

    /// Move one position forward (towards the back) and
    /// return a reference to the new position
    #[allow(clippy::should_implement_trait)]
    pub fn next(&mut self) -> Option<&mut T> {
        self.pos += if self.pos == self.list.len() { 0 } else { 1 };
        self.list.get_mut(self.pos)
    }

    /// Move one position backward (towards the front) and
    /// return a reference to the new position
    pub fn prev(&mut self) -> Option<&mut T> {
        match self.pos.checked_sub(1).is_some() {
            true => {
                self.pos -= 1;
                self.list.get_mut(self.pos)
            }
            false => None,
        }
    }

    /// Remove and return the element at the current position and move the cursor
    /// to the neighboring element that's closest to the back. This can be
    /// either the next or previous position.
    pub fn take(&mut self) -> Option<T> {
        let removed_element = if self.list.get(self.pos).is_some() {
            Some(self.list.remove(self.pos))
        } else {
            None
        };

        self.list.shrink_to_fit();

        if self.list.len() - self.pos > self.pos || self.pos == self.list.len() {
            self.prev();
        }

        removed_element
    }

    pub fn insert_after(&mut self, element: T) {
        self.next();
        self.insert_before(element);
        self.prev();
        self.prev();
    }

    pub fn insert_before(&mut self, element: T) {
        self.list.insert(self.pos, element);
        self.next();
    }
}

impl<'a, T> Iterator for Iter<'a, T> {
    type Item = &'a T;

    fn next(&mut self) -> Option<&'a T> {
        self.0.next()
    }
}