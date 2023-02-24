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
    function checkSeat(row: number, col: number, map: string[]) {
      let occupied: number = 0;
      let empty: number = 0;
      for (let i = row - 1; i < row + 2; i++) {
        for (let j = col - 1; j < col + 2; j++) {
          if (i < 0 || i === input.length || j < 0 || j === input[0].length) {
            empty++;
            if (empty === 8) {
              return "#";
            }
          } else {
            if (i !== row || j !== col) {
              if (map[i][j] === "#" && map[row][col] === "#") {
                occupied++;
                if (occupied === 4) {
                  return "L";
                }
              }
              if (map[i][j] !== "#" && map[row][col] === "L") {
                empty++;
                if (empty === 8) {
                  return "#";
                }
              }
            }
          }
        }
      }
      return map[row][col];
    }

    let isChanged: boolean = true;
    let map: string[] = [...input];
    while (isChanged) {
      isChanged = false;
      const newMap: string[] = [];
      for (let y = 0; y < map.length; y++) {
        newMap.push("");
        for (let x = 0; x < map[y].length; x++) {
          if (map[y][x] !== ".") {
            newMap[y] = newMap[y] + checkSeat(y, x, map);
            if (newMap[y][x] !== map[y][x]) {
              isChanged = true;
            }
          } else {
            newMap[y] = newMap[y] + ".";
          }
        }
      }
      map = [...newMap];
    }

    let counter = 0;
    map.forEach((line) => {
      counter += (line.match(/#/g) || []).length;
    });
    console.log("Answer for part 1", counter);
  }
  part1();

  // Part 2
  function part2() {
    const moves: { x: number; y: number }[] = [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ];

    function checkSeat(row: number, col: number, map: string[]) {
      let occupied: number = 0;
      let empty: number = 0;
      moves.forEach((move) => {
        let x: number = move.x;
        let y: number = move.y;
        while (true) {
          if (
            row + x === -1 ||
            row + x === map.length ||
            col + y === -1 ||
            col + y === map[0].length
          ) {
            empty++;
            break;
          } else {
            if (map[row + x][col + y] === "#") {
              if (map[row][col] === "#") {
                occupied++;
              }
              break;
            }

            if (map[row + x][col + y] === "L") {
              if (map[row][col] === "L") {
                empty++;
              }
              break;
            }

            if (map[row + x][col + y] === ".") {
              x += move.x;
              y += move.y;
            }
          }
        }
      });
      if (empty === 8) {
        return "#";
      }
      if (occupied >= 5) {
        return "L";
      }
      return map[row][col];
    }

    let isChanged: boolean = true;
    let map: string[] = [...input];
    while (isChanged) {
      isChanged = false;
      const newMap: string[] = [];
      for (let y = 0; y < map.length; y++) {
        newMap.push("");
        for (let x = 0; x < map[y].length; x++) {
          if (map[y][x] !== ".") {
            newMap[y] = newMap[y] + checkSeat(y, x, map);
            if (newMap[y][x] !== map[y][x]) {
              isChanged = true;
            }
          } else {
            newMap[y] = newMap[y] + ".";
          }
        }
      }
      map = [...newMap];
    }

    let counter = 0;
    map.forEach((line) => {
      counter += (line.match(/#/g) || []).length;
    });
    console.log("Answer for part 2", counter);
  }
  part2();
});
