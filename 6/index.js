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
    const input = data
        .split("\r\n\r\n")
        .map((group) => group.split("\r\n"));
    // console.log(input);
    // Part 1
    function part1() {
        let counter = 0;
        input.forEach((group) => {
            const questions = new Set();
            group.forEach((person) => {
                for (let i = 0; i < person.length; i++) {
                    questions.add(person[i]);
                }
            });
            counter += questions.size;
        });
        console.log("Answer for part 1", counter);
    }
    part1();
    // Part 2
    function part2() {
        let counter = 0;
        input.forEach((group) => {
            const questions = {};
            group.forEach((person) => {
                for (let i = 0; i < person.length; i++) {
                    const letter = person[i];
                    questions[letter] = questions[letter] + 1 || 1;
                }
            });
            Object.keys(questions).forEach((question) => {
                if (questions[question] === group.length) {
                    counter++;
                }
            });
        });
        console.log("Answer for part 2", counter);
    }
    part2();
});
