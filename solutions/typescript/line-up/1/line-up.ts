export function format(name: unknown, number: unknown): unknown {
  const n = Number(number);

  let suffix = "th";

  if (n % 100 !== 11 && n % 10 === 1) {
    suffix = "st";
  } else if (n % 100 !== 12 && n % 10 === 2) {
    suffix = "nd";
  } else if (n % 100 !== 13 && n % 10 === 3) {
    suffix = "rd";
  }

  return `${name}, you are the ${n}${suffix} customer we serve today. Thank you!`;
}