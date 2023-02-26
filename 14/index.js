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
        let mask;
        let mem = {};
        function applyMask(value, mask) {
            let helpMask = mask.slice(mask.length - value.length);
            let newValue = mask.slice(0, mask.length - helpMask.length);
            for (let i = 0; i < helpMask.length; i++) {
                if (helpMask[i] === "X") {
                    newValue += value[i];
                }
                else {
                    newValue += helpMask[i];
                }
            }
            const index = newValue.indexOf("1");
            return Number(parseInt(newValue.slice(index).replaceAll("X", "0"), 2));
        }
        input.forEach((line) => {
            const command = line.split(" = ");
            if (command[0].includes("mask")) {
                mask = command[1];
            }
            else {
                const index = command[0].indexOf("[");
                const memory = Number(command[0].slice(index + 1, command[0].length - 1));
                const value = Number(command[1]).toString(2);
                mem[memory] = applyMask(value, mask);
            }
        });
        console.log("Answer for part 1", Object.values(mem).reduce((total, value) => total + value));
    }
    part1();
    // Part 2
    function part2() {
        let mask;
        let mem = {};
        function applyMask(value, mask) {
            let helpMask = mask.slice(mask.length - value.length);
            let newValue = mask.slice(0, mask.length - helpMask.length);
            for (let i = 0; i < helpMask.length; i++) {
                if (helpMask[i] === "X") {
                    newValue += "X";
                }
                else if (helpMask[i] === "0") {
                    newValue += value[i];
                }
                else if (helpMask[i] === "1") {
                    newValue += "1";
                }
            }
            function applyFloat(value) {
                let values = [];
                let helpValue = "";
                for (let i = 0; i < value.length; i++) {
                    if (value[i] !== "X") {
                        helpValue += value[i];
                    }
                    else {
                        values = [
                            ...values,
                            ...applyFloat(helpValue + "1" + value.slice(i + 1)),
                        ];
                        helpValue += "0";
                    }
                    if (i === value.length - 1) {
                        values.push(parseInt(helpValue, 2));
                    }
                }
                return values;
            }
            const values = applyFloat(newValue);
            return values;
        }
        input.forEach((line) => {
            const command = line.split(" = ");
            if (command[0].includes("mask")) {
                mask = command[1];
            }
            else {
                const index = command[0].indexOf("[");
                const memory = Number(command[0].slice(index + 1, command[0].length - 1)).toString(2);
                const value = Number(command[1]);
                const values = applyMask(memory, mask);
                values.forEach((val) => {
                    mem[val] = value;
                });
            }
        });
        console.log("Answer for part 2", Object.values(mem).reduce((total, value) => total + value));
    }
    part2();
});
