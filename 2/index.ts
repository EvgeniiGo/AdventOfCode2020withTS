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

  // Part 1
  function part1() {
    let counter: number = 0;
    input.forEach((line) => {
      const [numbers, letter, password] = line.split(" ");
      const splitNumbers: string[] = numbers.split("-");
      const min: number = Number(splitNumbers[0]);
      const max: number = Number(splitNumbers[1]);
      const occurences: number = (
        password.match(new RegExp(letter[0], "g")) || []
      ).length;
      if (occurences >= min && occurences <= max) {
        counter++;
      }
    });
    console.log("Answer for part 1:", counter);
  }
  part1();

  // Part 2
  function part2() {
    let counter: number = 0;
    input.forEach((line) => {
      const [numbers, letter, password] = line.split(" ");
      const splitNumbers: string[] = numbers.split("-");
      const first: number = Number(splitNumbers[0]) - 1;
      const second: number = Number(splitNumbers[1]) - 1;
      if (
        (password[first] === letter[0] && password[second] !== letter[0]) ||
        (password[second] === letter[0] && password[first] !== letter[0])
      ) {
        counter++;
      }
    });
    console.log("Answer for part 2:", counter);
  }
  part2();
});
