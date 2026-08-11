use std::collections::{HashMap, BTreeSet};

pub struct School {
    // We use a HashMap to store grades. 
    // Using a BTreeSet for students automatically handles uniqueness and alphabetical sorting.
    grades: HashMap<u32, BTreeSet<String>>,
}

impl School {
    pub fn new() -> School {
        School {
            grades: HashMap::new(),
        }
    }

    pub fn add(&mut self, grade: u32, student: &str) {
        // Requirement: Each student cannot be added more than once to the roster.
        // We must check if the student exists in ANY grade first.
        if self.is_student_enrolled(student) {
            return; // Or handle error depending on specific test expectations, usually silent ignore or flag
        }

        self.grades
            .entry(grade)
            .or_insert_with(BTreeSet::new)
            .insert(student.to_string());
    }

    // Helper to check global uniqueness
    fn is_student_enrolled(&self, student: &str) -> bool {
        self.grades.values().any(|students| students.contains(student))
    }

    pub fn grades(&self) -> Vec<u32> {
        let mut grade_numbers: Vec<u32> = self.grades.keys().cloned().collect();
        grade_numbers.sort();
        grade_numbers
    }

    pub fn grade(&self, grade: u32) -> Vec<String> {
        match self.grades.get(&grade) {
            Some(students) => students.iter().cloned().collect(),
            None => Vec::new(),
        }
    }

    pub fn sorted(&self) -> Vec<(u32, Vec<String>)> {
        let mut result = Vec::new();
        
        // Get all grade numbers and sort them
        let mut grade_numbers: Vec<u32> = self.grades.keys().cloned().collect();
        grade_numbers.sort();

        for grade in grade_numbers {
            // BTreeSet is already sorted alphabetically
            let students: Vec<String> = self.grades[&grade].iter().cloned().collect();
            result.push((grade, students));
        }

        result
    }
}   