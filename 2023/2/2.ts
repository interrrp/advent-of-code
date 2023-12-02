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

function minimumCubesNeeded(game: Game): Set {
  return {
    numRedCubes: Math.max(...game.sets.map((set) => set.numRedCubes)),
    numGreenCubes: Math.max(...game.sets.map((set) => set.numGreenCubes)),
    numBlueCubes: Math.max(...game.sets.map((set) => set.numBlueCubes)),
  };
}

const input = await Deno.readTextFile("2023/2/input.txt");

const games = parseGames(input);
let powersSum = 0;
for (const game of games) {
  const min = minimumCubesNeeded(game);
  powersSum += min.numRedCubes * min.numGreenCubes * min.numBlueCubes;
}
console.log(powersSum);
