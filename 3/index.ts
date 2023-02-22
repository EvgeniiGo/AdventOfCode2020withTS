export {};
const fs = require("fs");

// Reading input data from file
fs.readFile("./input.txt", { encoding: "utf8" }, (err: any, data: string) => {
  if (err) {
    console.log(typeof err);
    return;
  }
  // console.log([data]);

  const input: string[] = data.split("\r\n");
  // console.log(input);

  const slopes = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ];

  function countTrees(slopeX: number, slopeY: number): number {
    let x: number = 0;
    let y: number = 0;
    let counter: number = 0;
    while (true) {
      x += slopeX;
      y += slopeY;
      if (y >= input.length) {
        return counter;
      }

      if (x >= input[y].length) {
        x = x % input[y].length;
      }

      if (input[y][x] === "#") {
        counter += 1;
      }
    }
  }
  // Part 1
  function part1() {
    const trees: number = countTrees(3, 1);
    console.log("Answer for part 1:", trees);
  }
  part1();
  // Part 2
  function part2() {
    const trees: number[] = [];
    slopes.forEach((slope) => {
      trees.push(countTrees(slope.right, slope.down));
    });
    console.log(
      "Answer for part 2:",
      trees.reduce((total, num) => total * num)
    );
  }
  part2();
});
