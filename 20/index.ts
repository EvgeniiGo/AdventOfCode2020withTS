export {};
const fs = require("fs");

// Reading input data from file
fs.readFile("./input.txt", { encoding: "utf8" }, (err: any, data: string) => {
  if (err) {
    console.log(typeof err);
    return;
  }
  // console.log([data]);

  const input: string[] = data.split("\r\n\r\n");
  // console.log(input);

  const map: { [tileNum: string]: string[] } = {};

  function reverseString(someString: string): string {
    let newString = "";
    for (let i = someString.length - 1; i >= 0; i--) {
      newString += someString[i];
    }
    return newString;
  }

  function findBorders(table: string[]): string[] {
    const borders: string[] = [];
    borders.push(table[0]);
    borders.push(table[table.length - 1]);

    let leftBorder: string = "";
    let rightBorder: string = "";
    for (let i = 0; i < table.length; i++) {
      leftBorder += table[i][0];
      rightBorder += table[i][table[i].length - 1];
    }
    borders.push(leftBorder);
    borders.push(rightBorder);
    return borders;
  }
  input.forEach((tile) => {
    const index: string = tile.slice(5, tile.indexOf(":"));
    const table: string[] = tile.split("\r\n").slice(1);
    map[index] = findBorders(table);
  });

  // Part 1
  function part1() {
    const corners: number[] = [];
    const tileNumbers: string[] = Object.keys(map);
    for (let i = 0; i < tileNumbers.length; i++) {
      let counter: number = 0;
      for (let j = 0; j < map[tileNumbers[i]].length; j++) {
        for (let z = 0; z < tileNumbers.length; z++) {
          if (z !== i) {
            const isFound: boolean =
              map[tileNumbers[z]].includes(map[tileNumbers[i]][j]) ||
              map[tileNumbers[z]].includes(
                reverseString(map[tileNumbers[i]][j])
              );

            if (isFound) {
              counter++;
              break;
            }
          }
        }
      }
      if (counter === 2) {
        corners.push(Number(tileNumbers[i]));
      }
    }
    console.log(
      "Answer for part 1",
      corners.reduce((total, value) => (total *= value))
    );
  }
  part1();

  // Part 2
  function part2() {}
  part2();
});
