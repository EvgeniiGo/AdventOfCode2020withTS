"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
// Reading input data from file
fs.readFile("./input.txt", { encoding: "utf8" }, (err, data) => {
    if (err) {
        console.log(typeof err);
        return;
    }
    // console.log([data]);
    const input = data.split("\r\n");
    // console.log(input);
    // Part 1
    function part1() {
        const map = {};
        for (let x = 0; x < input.length; x++) {
            map[x] = {};
            for (let y = 0; y < input[x].length; y++) {
                map[x][y] = {};
                map[x][y][0] = input[x][y];
            }
        }
        function updateCube(x, y, z) {
            let counter = 0;
            for (let i = x - 1; i < x + 2; i++) {
                for (let j = y - 1; j < y + 2; j++) {
                    for (let m = z - 1; m < z + 2; m++) {
                        if (i !== x || j !== y || m !== z) {
                            if (map[i][j][m] === "#") {
                                counter++;
                            }
                        }
                    }
                }
            }
            if (map[x][y][z] === "#") {
                if (counter === 2 || counter === 3) {
                    return "#";
                }
                else {
                    return ".";
                }
            }
            else {
                if (counter === 3) {
                    return "#";
                }
                else {
                    return ".";
                }
            }
        }
        for (let c = 0; c < 6; c++) {
            const newMap = {};
            for (let x = -13; x < 18; x++) {
                newMap[x] = {};
                map[x] = map[x] || {};
                for (let y = -13; y < 18; y++) {
                    newMap[x][y] = {};
                    map[x][y] = map[x][y] || {};
                    for (let z = -13; z < 18; z++) {
                        map[x][y][z] = map[x][y][z] || ".";
                    }
                }
            }
            for (let x = -12; x < 17; x++) {
                for (let y = -12; y < 17; y++) {
                    for (let z = -12; z < 17; z++) {
                        newMap[x][y][z] = updateCube(x, y, z);
                    }
                }
            }
            for (let x = -12; x < 17; x++) {
                for (let y = -12; y < 17; y++) {
                    for (let z = -12; z < 17; z++) {
                        map[x][y][z] = newMap[x][y][z];
                    }
                }
            }
        }
        let counter = 0;
        for (let x = -12; x < 17; x++) {
            for (let y = -12; y < 17; y++) {
                for (let z = -12; z < 17; z++) {
                    if (map[x][y][z] === "#") {
                        counter++;
                    }
                }
            }
        }
        console.log("Answer for part 1", counter);
    }
    part1();
    // Part 2
    function part2() {
        const map = {};
        for (let x = 0; x < input.length; x++) {
            map[x] = {};
            for (let y = 0; y < input[x].length; y++) {
                map[x][y] = {};
                map[x][y][0] = {};
                map[x][y][0][0] = input[x][y];
            }
        }
        function updateCube(x, y, z, w) {
            let counter = 0;
            for (let i = x - 1; i < x + 2; i++) {
                for (let j = y - 1; j < y + 2; j++) {
                    for (let m = z - 1; m < z + 2; m++) {
                        for (let n = w - 1; n < w + 2; n++) {
                            if (i !== x || j !== y || m !== z || n !== w) {
                                if (map[i][j][m][n] === "#") {
                                    counter++;
                                }
                            }
                        }
                    }
                }
            }
            if (map[x][y][z][w] === "#") {
                if (counter === 2 || counter === 3) {
                    return "#";
                }
                else {
                    return ".";
                }
            }
            else {
                if (counter === 3) {
                    return "#";
                }
                else {
                    return ".";
                }
            }
        }
        for (let c = 0; c < 6; c++) {
            const newMap = {};
            for (let x = -13; x < 18; x++) {
                newMap[x] = {};
                map[x] = map[x] || {};
                for (let y = -13; y < 18; y++) {
                    newMap[x][y] = {};
                    map[x][y] = map[x][y] || {};
                    for (let z = -13; z < 18; z++) {
                        newMap[x][y][z] = {};
                        map[x][y][z] = map[x][y][z] || {};
                        for (let w = -13; w < 18; w++) {
                            map[x][y][z][w] = map[x][y][z][w] || ".";
                        }
                    }
                }
            }
            for (let x = -12; x < 17; x++) {
                for (let y = -12; y < 17; y++) {
                    for (let z = -12; z < 17; z++) {
                        for (let w = -12; w < 17; w++) {
                            newMap[x][y][z][w] = updateCube(x, y, z, w);
                        }
                    }
                }
            }
            for (let x = -12; x < 17; x++) {
                for (let y = -12; y < 17; y++) {
                    for (let z = -12; z < 17; z++) {
                        for (let w = -12; w < 17; w++) {
                            map[x][y][z][w] = newMap[x][y][z][w];
                        }
                    }
                }
            }
        }
        let counter = 0;
        for (let x = -12; x < 17; x++) {
            for (let y = -12; y < 17; y++) {
                for (let z = -12; z < 17; z++) {
                    for (let w = -12; w < 17; w++) {
                        if (map[x][y][z][w] === "#") {
                            counter++;
                        }
                    }
                }
            }
        }
        console.log("Answer for part 2", counter);
    }
    part2();
});
