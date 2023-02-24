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
    const input = data.split("\r\n").map((value) => Number(value));
    // console.log(input);
    function checkValidity(i) {
        for (let j = i - 25; j < i - 1; j++) {
            for (let z = j + 1; z < i; z++) {
                if (input[i] === input[j] + input[z]) {
                    return true;
                }
            }
        }
        return false;
    }
    // Part 1
    function part1() {
        for (let i = 25; i < input.length; i++) {
            const isValid = checkValidity(i);
            if (!isValid) {
                console.log("Answer for part 1", input[i]);
                return;
            }
        }
    }
    part1();
    // Part 2
    function part2() {
        for (let i = 25; i < input.length; i++) {
            const isValid = checkValidity(i);
            if (!isValid) {
                for (let n = 2; n < Infinity; n++) {
                    for (let x = 0; x <= i - n; x++) {
                        const arr = input.slice(x, x + n);
                        if (arr.reduce((sum, value) => sum + value) === input[i]) {
                            console.log("Answer for part 2", Math.min(...arr) + Math.max(...arr));
                            return;
                        }
                    }
                }
            }
        }
    }
    part2();
});
