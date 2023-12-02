const input = await Deno.readTextFile("2023/1/input.txt");

function isDigit(char: string): boolean {
  return /\d/.test(char);
}

function getDigits(s: string): number[] {
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
