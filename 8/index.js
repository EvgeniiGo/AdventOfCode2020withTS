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
        let i = 0;
        let acc = 0;
        const instructions = [];
        while (!instructions.includes(i)) {
            instructions.push(i);
            const instruction = input[i].split(" ");
            if (instruction[0] === "nop") {
                i++;
            }
            else if (instruction[0] === "acc") {
                acc += Number(instruction[1]);
                i++;
            }
            else if (instruction[0] === "jmp") {
                i += Number(instruction[1]);
            }
        }
        console.log("Answer for part 1", acc);
    }
    part1();
    // Part 2
    function part2() {
        for (let z = 0; z < input.length; z++) {
            const line = input[z].split(" ");
            if (line[0] !== "acc") {
                let updatedInput = [...input];
                const command = line[0] === "nop" ? "jmp" : "nop";
                updatedInput[z] = command + " " + line[1];
                let i = 0;
                let acc = 0;
                const instructions = [];
                while (!instructions.includes(i)) {
                    instructions.push(i);
                    const instruction = updatedInput[i].split(" ");
                    if (instruction[0] === "nop") {
                        i++;
                    }
                    else if (instruction[0] === "acc") {
                        acc += Number(instruction[1]);
                        i++;
                    }
                    else if (instruction[0] === "jmp") {
                        i += Number(instruction[1]);
                    }
                    if (i === input.length) {
                        console.log("Answer for part 2", acc);
                        return;
                    }
                }
            }
        }
    }
    part2();
});
