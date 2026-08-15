use std::fmt::Debug;

#[derive(Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct Tree<T: Debug + Ord> {
    label: T,
    children: Vec<Tree<T>>,
}

impl<T: Debug + Ord> Tree<T> {
    pub fn new(label: T) -> Self {
        Self {
            label,
            children: vec![],
        }
    }

    pub fn with_child(mut self, child: Self) -> Self {
        self.children.push(child);
        self.children.sort_unstable();
        self
    }

    pub fn pov_from(&mut self, from: &T) -> bool {
        let Some(path) = self.path_to(from) else {
            return false;
        };
        for i in path {
            let mut tree = self.children.remove(i);
            self.children.sort_unstable_by(|a, b| a.label.cmp(&b.label));
            std::mem::swap(self, &mut tree);
            self.children.push(tree);
        }
        self.children.sort_unstable_by(|a, b| a.label.cmp(&b.label));
        true
    }

    pub fn path_between<'a>(&'a mut self, from: &'a T, to: &'a T) -> Option<Vec<&'a T>> {
        let path1 = self.path_to(from)?;
        let path2 = self.path_to(to)?;
        let common = path1.iter().zip(&path2).take_while(|(a, b)| a == b).count();

        let labels1 = self.labels(&path1);
        let labels2 = self.labels(&path2);
        let mut ans: Vec<_> = labels1.iter().skip(common).rev().copied().collect();
        if common == 0 {
            ans.push(&self.label);
        }
        ans.extend(labels2.iter().skip(common.saturating_sub(1)));
        Some(ans)
    }

    fn labels<'a>(&'a self, path: &[usize]) -> Vec<&'a T> {
        let mut t: &Self = self;
        path.iter().map(|&i| {
            t = &t.children[i];
            &t.label
        }).collect()
    }

    fn path_to(&self, to: &T) -> Option<Vec<usize>> {
        if self.label == *to {
            return Some(vec![]);
        }
        self.children.iter().enumerate().find_map(|(i, subtree)| {
            subtree
                .path_to(to)
                .map(|sublist| std::iter::once(i).chain(sublist).collect())
        })
    }
}