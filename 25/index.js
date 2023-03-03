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
    const card = Number(input[0]);
    const door = Number(input[1]);
    function findLoopSize(key) {
        let value = 1;
        let counter = 0;
        let subject = 7;
        while (true) {
            counter++;
            value = value * subject;
            value = value % 20201227;
            if (value === key) {
                return counter;
            }
        }
    }
    function findEncryptionKey(key, loops) {
        let value = 1;
        let subject = key;
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
    function part2() { }
    part2();
});
