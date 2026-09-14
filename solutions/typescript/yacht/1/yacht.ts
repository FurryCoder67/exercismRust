export const enum Category {
  ONES,
  TWOS,
  THREES,
  FOURS,
  FIVES,
  SIXES,
  FULL_HOUSE,
  FOUR_OF_A_KIND,
  LITTLE_STRAIGHT,
  BIG_STRAIGHT,
  CHOICE,
  YACHT,
}

export const score = (dice: unknown, category: Category): unknown => {
  const rolls = dice as number[];

  const counts = [0, 0, 0, 0, 0, 0, 0];

  for (const die of rolls) {
    counts[die]++;
  }

  const sum = rolls.reduce((total, die) => total + die, 0);

  switch (category) {
    case Category.ONES:
      return counts[1] * 1;

    case Category.TWOS:
      return counts[2] * 2;

    case Category.THREES:
      return counts[3] * 3;

    case Category.FOURS:
      return counts[4] * 4;

    case Category.FIVES:
      return counts[5] * 5;

    case Category.SIXES:
      return counts[6] * 6;

    case Category.FULL_HOUSE:
      return counts.slice(1).includes(3) && counts.slice(1).includes(2)
        ? sum
        : 0;

    case Category.FOUR_OF_A_KIND:
      for (let face = 1; face <= 6; face++) {
        if (counts[face] >= 4) {
          return face * 4;
        }
      }
      return 0;

    case Category.LITTLE_STRAIGHT:
      return (
        counts[1] === 1 &&
        counts[2] === 1 &&
        counts[3] === 1 &&
        counts[4] === 1 &&
        counts[5] === 1
      )
        ? 30
        : 0;

    case Category.BIG_STRAIGHT:
      return (
        counts[2] === 1 &&
        counts[3] === 1 &&
        counts[4] === 1 &&
        counts[5] === 1 &&
        counts[6] === 1
      )
        ? 30
        : 0;

    case Category.CHOICE:
      return sum;

    case Category.YACHT:
      return counts.slice(1).includes(5) ? 50 : 0;

    default:
      return 0;
  }
};