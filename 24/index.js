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
    const actions = {
        e: { n: 0, e: 2 },
        se: { n: -1, e: 1 },
        sw: { n: -1, e: -1 },
        w: { n: 0, e: -2 },
        nw: { n: 1, e: -1 },
        ne: { n: 1, e: 1 },
    };
    // Part 1
    function part1() {
        let flipped = [];
        input.forEach((line) => {
            const position = { n: 0, e: 0 };
            let i = 0;
            while (i < line.length) {
                if (["n", "s"].includes(line[i])) {
                    position.n += actions[line.slice(i, i + 2)].n;
                    position.e += actions[line.slice(i, i + 2)].e;
                    i += 2;
                }
                else {
                    position.n += actions[line[i]].n;
                    position.e += actions[line[i]].e;
                    i++;
                }
            }
            const s = String(position.n) + "," + String(position.e);
            if (flipped.includes(s)) {
                const index = flipped.indexOf(s);
                flipped = [...flipped.slice(0, index), ...flipped.slice(index + 1)];
            }
            else {
                flipped.push(s);
            }
        });
        console.log("Answer for part 1:", flipped.length);
        return flipped;
    }
    part1();
    // Part 2
    function part2() {
        let flipped = part1();
        for (let i = 0; i < 100; i++) {
            let minN = Infinity;
            let minE = Infinity;
            let maxN = -Infinity;
            let maxE = -Infinity;
            flipped.forEach((pos) => {
                const tile = pos.split(",").map((val) => Number(val));
                if (tile[0] > maxN) {
                    maxN = tile[0];
                }
                if (tile[1] > maxE) {
                    maxE = tile[1];
                }
                if (tile[0] < minN) {
                    minN = tile[0];
                }
                if (tile[1] < minE) {
                    minE = tile[1];
                }
            });
            let copy = [];
            for (let n = minN - 1; n <= maxN + 1; n++) {
                for (let e = minE - 1; e <= maxE + 1; e++) {
                    const s = String(n) + "," + String(e);
                    const options = Object.keys(actions).map((a) => {
                        return String(n + actions[a].n) + "," + String(e + actions[a].e);
                    });
                    let counter = 0;
                    options.forEach((option) => {
                        if (flipped.includes(option)) {
                            counter++;
                        }
                    });
                    // if the tile we are checking is white
                    if (!flipped.includes(s)) {
                        if (counter === 2) {
                            copy.push(s);
                        }
                    }
                    // if the tile we are checking is black
                    else {
                        if (counter === 1 || counter === 2) {
                            copy.push(s);
                        }
                    }
                }
            }
            flipped = copy.slice();
        }
        console.log("Answer for part 2", flipped.length);
    }
    part2();
});
