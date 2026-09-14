const DEFAULT_STUDENTS = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Eve',
  'Fred',
  'Ginny',
  'Harriet',
  'Ileana',
  'Joseph',
  'Kincaid',
  'Larry',
] as const;

const PLANT_CODES = {
  G: 'grass',
  V: 'violets',
  R: 'radishes',
  C: 'clover',
} as const;

type Plant = typeof PLANT_CODES[keyof typeof PLANT_CODES];

// eslint-disable-next-line import/prefer-default-export
export class Garden {
  students: readonly string[];
  top: string;
  bottom: string;

  constructor(diagram: string, students = DEFAULT_STUDENTS as readonly string[]) {
    [this.top, this.bottom] = diagram.split('\n');
    this.students = [...students].sort() as readonly string[];
  }

  plants(student: string): Plant[] {
    const start = this.students.indexOf(student) * 2;

    return [...this.top.slice(start, start + 2), ...this.bottom.slice(start, start + 2)].map(
      (ch) => PLANT_CODES[ch as keyof typeof PLANT_CODES],
    );
  }
}