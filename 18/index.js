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
        function calculateExpression(exp) {
            let e = exp;
            while (true) {
                let firstIndex = e.indexOf(" ");
                let secondIndex = e.slice(firstIndex + 3).indexOf(" ") + firstIndex + 3;
                let value = 0;
                if (firstIndex === -1) {
                    return e;
                }
                else if (secondIndex - firstIndex - 3 === -1) {
                    if (e[firstIndex + 1] === "+") {
                        value =
                            Number(e.slice(0, firstIndex)) + Number(e.slice(firstIndex + 3));
                    }
                    else if (e[firstIndex + 1] === "*") {
                        value =
                            Number(e.slice(0, firstIndex)) * Number(e.slice(firstIndex + 3));
                    }
                    e = String(value);
                }
                else {
                    if (e[firstIndex + 1] === "+") {
                        value =
                            Number(e.slice(0, firstIndex)) +
                                Number(e.slice(firstIndex + 3, secondIndex));
                    }
                    else if (e[firstIndex + 1] === "*") {
                        value =
                            Number(e.slice(0, firstIndex)) *
                                Number(e.slice(firstIndex + 3, secondIndex));
                    }
                    e = String(value) + e.slice(secondIndex);
                }
            }
        }
        let sum = 0;
        input.forEach((line) => {
            let e = line;
            while (true) {
                if (e.includes(")")) {
                    const end = e.indexOf(")");
                    const start = e.slice(0, end).lastIndexOf("(");
                    const value = calculateExpression(e.slice(start + 1, end));
                    e = e.slice(0, start) + value + e.slice(end + 1);
                }
                else if (e.includes(" ")) {
                    e = calculateExpression(e);
                }
                else {
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
        function calculateExpression(exp) {
            let e = exp;
            while (true) {
                let value = 0;
                if (!e.includes(" ")) {
                    return e;
                }
                else if ((e.includes("*") && !e.includes("+")) ||
                    (!e.includes("*") && e.includes("+"))) {
                    const firstIndex = e.indexOf(" ");
                    const secondIndex = e.slice(firstIndex + 3).indexOf(" ");
                    if (secondIndex === -1) {
                        if (e.includes("+")) {
                            value =
                                Number(e.slice(0, firstIndex)) +
                                    Number(e.slice(firstIndex + 3));
                        }
                        else if (e.includes("*")) {
                            value =
                                Number(e.slice(0, firstIndex)) *
                                    Number(e.slice(firstIndex + 3));
                        }
                        e = String(value);
                    }
                    else {
                        if (e.includes("+")) {
                            value =
                                Number(e.slice(0, firstIndex)) +
                                    Number(e.slice(firstIndex + 3, firstIndex + 3 + secondIndex));
                        }
                        else if (e.includes("*")) {
                            value =
                                Number(e.slice(0, firstIndex)) *
                                    Number(e.slice(firstIndex + 3, firstIndex + 3 + secondIndex));
                        }
                        e = String(value) + e.slice(firstIndex + 3 + secondIndex);
                    }
                }
                else {
                    const index = e.indexOf(" +");
                    const firstIndex = e.slice(0, index).lastIndexOf(" ") + 1;
                    const secondIndex = e.slice(index + 3).indexOf(" ");
                    if (secondIndex === -1) {
                        value =
                            Number(e.slice(firstIndex, index)) + Number(e.slice(index + 3));
                        e = e.slice(0, firstIndex) + String(value);
                    }
                    else {
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
        let sum = 0;
        input.forEach((line) => {
            let e = line;
            while (true) {
                if (e.includes(")")) {
                    const end = e.indexOf(")");
                    const start = e.slice(0, end).lastIndexOf("(");
                    const value = calculateExpression(e.slice(start + 1, end));
                    e = e.slice(0, start) + value + e.slice(end + 1);
                }
                else if (e.includes(" ")) {
                    e = calculateExpression(e);
                }
                else {
                    sum += Number(e);
                    break;
                }
            }
        });
        console.log("Answer for part 2", sum);
    }
    part2();
});
