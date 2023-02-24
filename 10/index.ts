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
  input.push(0);
  input.sort((a, b) => a - b);
  // console.log(input);

  // Part 1
  function part1(): void {
    let diff1: number = 0;
    let diff3: number = 1;
    for (let i = 1; i < input.length; i++) {
      if (input[i] - input[i - 1] === 1) {
        diff1++;
      } else if (input[i] - input[i - 1] === 3) {
        diff3++;
      }
    }
    console.log("Answer for part 1", diff1 * diff3);
  }
  part1();

  // Part 2
  function part2(): void {
    const arrays: number[][] = [];
    let index: number = 0;
    input.push(input[input.length - 1] + 3);
    for (let i = 1; i < input.length - 1; i++) {
      if (input[i + 1] - input[i] === 3) {
        arrays.push(input.slice(index, i + 1));
        index = i + 1;
      }
    }

    function findOption(index: number = 0, arr: number[]): number {
      const input: number[] = [...arr];
      let counter: number = 1;
      for (let i = index; i < input.length - 1; i++) {
        const first: number = input[i + 1];
        const second: number = input[i + 2] || first + 3;
        const third: number = input[i + 3] || first + 3;

        if (first - input[i] === 2) {
          if (second - input[i] !== 3) {
          } else if (second - input[i] === 3) {
            counter += findOption(i + 2, input);
          }
        } else if (first - input[i] === 1) {
          if (second - input[i] !== 2) {
            if (second - input[i] !== 3) {
            } else if (second - input[i] === 3) {
              counter += findOption(i + 2, input);
            }
          } else if (second - input[i] === 2) {
            if (third - input[i] !== 3) {
              counter += findOption(i + 2, input);
            } else if (third - input[i] === 3) {
              counter += findOption(i + 3, input);
              counter += findOption(i + 2, input);
            }
          }
        }
      }
      return counter;
    }

    let counter: number = 1;
    arrays.forEach((arr) => {
      const result: number = findOption(0, arr);
      counter *= result;
    });
    console.log("Answer for part 2", counter);
  }
  part2();
});
