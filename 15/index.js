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
    const input = data.split(",").map((value) => Number(value));
    // console.log(input);
    // Part 1
    function part1() {
        let map = {};
        for (let i = 0; i < input.length - 1; i++) {
            map[input[i]] = i;
        }
        let lastValue = input[input.length - 1];
        for (let i = input.length - 1; i < 2020; i++) {
            if (i === 2019) {
                console.log("Answer for part 1", lastValue);
            }
            if (!Object.keys(map).includes(String(lastValue))) {
                map[lastValue] = i;
                lastValue = 0;
            }
            else {
                const index = map[lastValue];
                map[lastValue] = i;
                lastValue = i - index;
            }
        }
    }
    part1();
    // Part 2
    function part2() {
        let map = { 0: {} };
        for (let i = 0; i < input.length - 1; i++) {
            map[0][input[i]] = i;
        }
        let lastValue = input[input.length - 1];
        for (let i = input.length - 1; i < 30000000; i++) {
            if (i % 1000000 === 0) {
                console.log("turn", i);
            }
            if (i === 30000000 - 1) {
                console.log("Answer for part 2", lastValue);
            }
            let t = Math.floor(lastValue / 100);
            map[t] = map[t] || {};
            if (!Object.keys(map[t]).includes(String(lastValue))) {
                map[t][lastValue] = i;
                lastValue = 0;
            }
            else {
                const index = map[t][lastValue];
                map[t][lastValue] = i;
                lastValue = i - index;
            }
        }
    }
    part2();
});
