export {};
const fs = require("fs");

// Reading input data from file
fs.readFile("./input.txt", { encoding: "utf8" }, (err: any, data: string) => {
  if (err) {
    console.log(typeof err);
    return;
  }
  // console.log([data]);

  const input: number[] = data.split("\r\n").map((value) => Number(value));
  // console.log(input);

  // Part 1
  function part1() {
    for (let i = 0; i < input.length - 1; i++) {
      for (let j = i + 1; j < input.length; j++) {
        if (input[i] + input[j] === 2020) {
          console.log("Answer for Part 1:", input[i] * input[j]);
          break;
        }
      }
    }
  }
  part1();

  // Part 2
  function part2() {
    for (let i = 0; i < input.length - 2; i++) {
      for (let j = i + 1; j < input.length - 1; j++) {
        for (let z = j + 1; z < input.length; z++) {
          if (input[i] + input[j] + input[z] === 2020) {
            console.log("Answer for Part 2:", input[i] * input[j] * input[z]);
            break;
          }
        }
      }
    }
  }
  part2();
});
