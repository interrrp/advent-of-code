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

const input = await Deno.readTextFile("2023/1/input.txt");
let sum = 0;
for (const line of input.split("\n")) {
  const [firstDigit, lastDigit] = getFirstAndLastDigits(line);
  sum += Number(`${firstDigit}${lastDigit}`);
}
console.log(sum);
