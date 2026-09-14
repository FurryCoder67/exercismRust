type LettersSet = { [key: string]: number };
type Permutation = (string | number)[];

let leftFactor: LettersSet;
let rightFactor: LettersSet;
let notZeros: Set<string>;

export function solve(puzzle: string): LettersSet | undefined {
  leftFactor = {};
  rightFactor = {};
  notZeros = new Set<string>();

  const operations = puzzle.replace(/[^A-Z\+\=]+/g, '').split('==');

  leftFactor = generateFactor(operations[0]);
  rightFactor = generateFactor(operations[1]);

  let values = puzzle.replace(/[^A-Z]+/g, '').split('').filter((v, i, a) => a.indexOf(v) === i);
  values = Array(10 - values.length).fill(0).concat(values);

  let permutation = permute(values);

  if (! permutation) {
    return undefined;
  }
  
  return convertToLettersSet(permutation);
}

function generateFactor(operation: string): LettersSet {
  let factor: LettersSet = {};

  for (let value of operation.split('+')) {
    let digits = value.split('').reverse();

    notZeros.add(digits[digits.length - 1]);

    for (let index = 0; index < digits.length; index++) {
      factor[digits[index]] = (factor[digits[index]] || 0) + (10 ** index);
    }
  }

  return factor;
}

function permute(permutation: string[]): Permutation | undefined {
  if (comparePermutation(permutation)) {
    return permutation;
  }

  let length = permutation.length,
      c = new Array(length).fill(0),
      i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      
      if (comparePermutation(permutation)) {
        return permutation;
      }

    } else {
      c[i] = 0;
      ++i;
    }
  } 
}

function comparePermutation(permutation: Permutation) {  
  if (permutation[0] != 0 && notZeros.has(permutation[0] as string)) {
    return false;
  }
  
  return factorValue(permutation, leftFactor) == factorValue(permutation, rightFactor);
}

function factorValue(permutation: Permutation, factor: LettersSet) {
  let value = 0;

  for (let index = 0; index < 10; index++) {
    let letter = permutation[index];

    if (letter == 0) {
      continue;
    }

    value += index * (factor[permutation[index]] || 0);
  }

  return value;
}

function convertToLettersSet(permutation: Permutation) {
  return permutation.reduce((acc, letter, index) => {
    if (letter) {
      acc[letter] = index;
    }
    return acc;
  }, {} as LettersSet);
}