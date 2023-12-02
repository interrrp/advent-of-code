type Game = {
  id: number;
  sets: Set[];
};
type Set = {
  numRedCubes: number;
  numGreenCubes: number;
  numBlueCubes: number;
};

function parseGame(game: string): Game {
  const id = game.match(/Game (\d+):/)?.[1];
  if (id === undefined) throw new Error("Invalid game");

  game = game.replace(/Game \d+: /, "");

  const sets: Set[] = [];
  for (let setLine of game.split(";")) {
    setLine = setLine.trim();

    const red = setLine.match(/(\d+) red/)?.[1] ?? 0;
    const green = setLine.match(/(\d+) green/)?.[1] ?? 0;
    const blue = setLine.match(/(\d+) blue/)?.[1] ?? 0;

    sets.push({
      numRedCubes: Number(red),
      numGreenCubes: Number(green),
      numBlueCubes: Number(blue),
    });
  }

  return { id: Number(id), sets };
}

function parseGames(games: string): Game[] {
  return games.split("\n").map((game) => parseGame(game));
}

const input = await Deno.readTextFile("2023/2/input.txt");

const games = parseGames(input);
let idSum = 0;
for (const game of games) {
  if (
    game.sets.some((set) =>
      set.numRedCubes > 12 || set.numGreenCubes > 13 || set.numBlueCubes > 14
    )
  ) continue;

  idSum += game.id;
}
console.log(idSum);
