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

  function sumProduct(arr: number[]): number {
    let counter = 0;
    let multiplicator = 0;
    while (arr.length > 0) {
      multiplicator++;
      counter += Number(arr.pop()) * multiplicator;
    }
    return counter;
  }
  // Part 1
  function part1() {
    const p1: number[] = input[0]
      .split("\r\n")
      .slice(1)
      .map((value) => Number(value));
    const p2: number[] = input[1]
      .split("\r\n")
      .slice(1)
      .map((value) => Number(value));

    while (p1.length > 0 && p2.length > 0) {
      const c1: number = Number(p1.shift());
      const c2: number = Number(p2.shift());
      if (c1 > c2) {
        p1.push(c1, c2);
      } else {
        p2.push(c2, c1);
      }
    }

    let result: number;
    if (p1.length === 0) {
      result = sumProduct(p2);
    } else {
      result = sumProduct(p1);
    }
    console.log("Answer for part 1", result);
  }
  part1();

  // Part 2
  function part2() {
    const p1: number[] = input[0]
      .split("\r\n")
      .slice(1)
      .map((value) => Number(value));
    const p2: number[] = input[1]
      .split("\r\n")
      .slice(1)
      .map((value) => Number(value));

    function game(x: number[], y: number[]): number {
      const p1: number[] = [...x];
      const p2: number[] = [...y];

      let previousRounds: string[] = [];

      while (p1.length > 0 && p2.length > 0) {
        const cards: string = p1.join(",") + p2.join(",");
        if (!previousRounds.includes(cards)) {
          previousRounds.push(cards);
          const c1: number = Number(p1.shift());
          const c2: number = Number(p2.shift());
          let winner: number;
          if (c1 <= p1.length && c2 <= p2.length) {
            winner = game(p1.slice(0, c1), p2.slice(0, c2));
            if (winner === 1) {
              p1.push(c1, c2);
            } else {
              p2.push(c2, c1);
            }
          } else {
            if (c1 > c2) {
              p1.push(c1, c2);
            } else {
              p2.push(c2, c1);
            }
          }
        } else {
          return 1;
        }
      }
      if (p1.length === 0) {
        return 2;
      } else {
        return 1;
      }
    }

    while (p1.length > 0 && p2.length > 0) {
      const c1: number = Number(p1.shift());
      const c2: number = Number(p2.shift());

      if (c1 <= p1.length && c2 <= p2.length) {
        const winner: number = game(p1.slice(0, c1), p2.slice(0, c2));
        if (winner === 1) {
          p1.push(c1, c2);
        } else {
          p2.push(c2, c1);
        }
      } else {
        if (c1 > c2) {
          p1.push(c1, c2);
        } else {
          p2.push(c2, c1);
        }
      }
    }

    let result: number;
    if (p1.length === 0) {
      result = sumProduct(p2);
    } else {
      result = sumProduct(p1);
    }
    console.log("Answer for part 2", result);
  }
  part2();
});
