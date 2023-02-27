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
    const input = data.split("\r\n\r\n");
    // console.log(input);
    const rules = {};
    input[0].split("\r\n").forEach((rule) => {
        rules[rule.slice(0, rule.indexOf(":"))] = rule
            .slice(rule.indexOf(" ") + 1)
            .split(" ");
    });
    const messages = input[1].split("\r\n");
    function convertValue(value) {
        if (value[0] === '"') {
            return value[1];
        }
        else if (value === "|") {
            return "|";
        }
        else {
            return "(" + buildRegex(value) + ")";
        }
    }
    function buildRegex(stringNumber) {
        return rules[stringNumber].map((rule) => convertValue(rule)).join("");
    }
    const regex = "^" + buildRegex("0") + "$";
    // Part 1
    function part1() {
        let counter = 0;
        messages.forEach((message) => {
            if (message.match(regex)) {
                counter++;
            }
        });
        console.log(counter);
    }
    part1();
    // Part 2
    function part2() { }
    part2();
});
