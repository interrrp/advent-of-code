const input = await Deno.readTextFile("2023/1/input.txt");

function isDigit(char: string): boolean {
  return /\d/.test(char);
}

function getDigits(s: string): number[] {
  s = s
    .replaceAll("one", "one1one")
    .replaceAll("two", "two2two")
    .replaceAll("three", "three3three")
    .replaceAll("four", "four4four")
    .replaceAll("five", "five5five")
    .replaceAll("six", "six6six")
    .replaceAll("seven", "seven7seven")
    .replaceAll("eight", "eight8eight")
    .replaceAll("nine", "nine9nine");

  return s
    .split("")
    .filter(isDigit)
    .map((c) => Number(c));
}

function getFirstAndLastDigits(s: string): [number, number] {
  const digits = getDigits(s);
  return [digits[0], digits[digits.length - 1]];
}

const sum = input
  .split("\n")
  .map((line) => getFirstAndLastDigits(line))
  .map(([first, last]) => Number(`${first}${last}`))
  .reduce((prev, curr) => prev + curr);
console.log(sum);
