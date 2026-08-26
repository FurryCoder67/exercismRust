export const recite = (
  initialBottleCount: unknown,
  takeDownCount: unknown
): unknown => {
  const numbers = [
    "no",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];

  const result: string[] = [];

  if (
    typeof initialBottleCount !== "number" ||
    typeof takeDownCount !== "number"
  ) {
    return result;
  }

  for (
    let bottles = initialBottleCount;
    bottles > initialBottleCount - takeDownCount;
    bottles--
  ) {
    const current = numbers[bottles];
    const next = numbers[bottles - 1];

    const currentCapitalized =
      current.charAt(0).toUpperCase() + current.slice(1);

    result.push(
      `${currentCapitalized} green ${bottles === 1 ? "bottle" : "bottles"} hanging on the wall,`,
      `${currentCapitalized} green ${bottles === 1 ? "bottle" : "bottles"} hanging on the wall,`,
      `And if one green bottle should accidentally fall,`,
      `There'll be ${next} green ${bottles - 1 === 1 ? "bottle" : "bottles"} hanging on the wall.`
    );

    if (bottles > initialBottleCount - takeDownCount + 1) {
      result.push("");
    }
  }

  return result;
};