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
    function calculateExpression(exp: string): string {
      let e: string = exp;
      while (true) {
        let firstIndex: number = e.indexOf(" ");
        let secondIndex: number =
          e.slice(firstIndex + 3).indexOf(" ") + firstIndex + 3;
        let value: number = 0;
        if (firstIndex === -1) {
          return e;
        } else if (secondIndex - firstIndex - 3 === -1) {
          if (e[firstIndex + 1] === "+") {
            value =
              Number(e.slice(0, firstIndex)) + Number(e.slice(firstIndex + 3));
          } else if (e[firstIndex + 1] === "*") {
            value =
              Number(e.slice(0, firstIndex)) * Number(e.slice(firstIndex + 3));
          }
          e = String(value);
        } else {
          if (e[firstIndex + 1] === "+") {
            value =
              Number(e.slice(0, firstIndex)) +
              Number(e.slice(firstIndex + 3, secondIndex));
          } else if (e[firstIndex + 1] === "*") {
            value =
              Number(e.slice(0, firstIndex)) *
              Number(e.slice(firstIndex + 3, secondIndex));
          }
          e = String(value) + e.slice(secondIndex);
        }
      }
    }

    let sum: number = 0;
    input.forEach((line) => {
      let e: string = line;
      while (true) {
        if (e.includes(")")) {
          const end: number = e.indexOf(")");
          const start: number = e.slice(0, end).lastIndexOf("(");
          const value = calculateExpression(e.slice(start + 1, end));
          e = e.slice(0, start) + value + e.slice(end + 1);
        } else if (e.includes(" ")) {
          e = calculateExpression(e);
        } else {
          sum += Number(e);
          break;
        }
      }
    });
    console.log("Answer for part 1", sum);
  }
  part1();

  // Part 2
  function part2() {
    function calculateExpression(exp: string): string {
      let e: string = exp;
      while (true) {
        let value: number = 0;
        if (!e.includes(" ")) {
          return e;
        } else if (
          (e.includes("*") && !e.includes("+")) ||
          (!e.includes("*") && e.includes("+"))
        ) {
          const firstIndex = e.indexOf(" ");
          const secondIndex = e.slice(firstIndex + 3).indexOf(" ");
          if (secondIndex === -1) {
            if (e.includes("+")) {
              value =
                Number(e.slice(0, firstIndex)) +
                Number(e.slice(firstIndex + 3));
            } else if (e.includes("*")) {
              value =
                Number(e.slice(0, firstIndex)) *
                Number(e.slice(firstIndex + 3));
            }
            e = String(value);
          } else {
            if (e.includes("+")) {
              value =
                Number(e.slice(0, firstIndex)) +
                Number(e.slice(firstIndex + 3, firstIndex + 3 + secondIndex));
            } else if (e.includes("*")) {
              value =
                Number(e.slice(0, firstIndex)) *
                Number(e.slice(firstIndex + 3, firstIndex + 3 + secondIndex));
            }
            e = String(value) + e.slice(firstIndex + 3 + secondIndex);
          }
        } else {
          const index: number = e.indexOf(" +");
          const firstIndex: number = e.slice(0, index).lastIndexOf(" ") + 1;
          const secondIndex: number = e.slice(index + 3).indexOf(" ");
          if (secondIndex === -1) {
            value =
              Number(e.slice(firstIndex, index)) + Number(e.slice(index + 3));
            e = e.slice(0, firstIndex) + String(value);
          } else {
            value =
              Number(e.slice(firstIndex, index)) +
              Number(e.slice(index + 3, secondIndex + index + 3));
            e =
              e.slice(0, firstIndex) +
              String(value) +
              e.slice(secondIndex + index + 3);
          }
        }
      }
    }

    let sum: number = 0;
    input.forEach((line) => {
      let e: string = line;
      while (true) {
        if (e.includes(")")) {
          const end: number = e.indexOf(")");
          const start: number = e.slice(0, end).lastIndexOf("(");
          const value = calculateExpression(e.slice(start + 1, end));
          e = e.slice(0, start) + value + e.slice(end + 1);
        } else if (e.includes(" ")) {
          e = calculateExpression(e);
        } else {
          sum += Number(e);
          break;
        }
      }
    });
    console.log("Answer for part 2", sum);
  }
  part2();
});
