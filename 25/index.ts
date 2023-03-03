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

  const card: number = Number(input[0]);
  const door: number = Number(input[1]);

  function findLoopSize(key: number): number {
    let value: number = 1;
    let counter: number = 0;
    let subject: number = 7;
    while (true) {
      counter++;
      value = value * subject;
      value = value % 20201227;
      if (value === key) {
        return counter;
      }
    }
  }

  function findEncryptionKey(key: number, loops: number): number {
    let value: number = 1;
    let subject: number = key;
    for (let i = 0; i < loops; i++) {
      value = value * subject;
      value = value % 20201227;
    }
    return value;
  }

  // Part 1
  function part1() {
    console.log(findEncryptionKey(card, findLoopSize(door)));
  }
  part1();

  // Part 2
  function part2() {}
  part2();
});
