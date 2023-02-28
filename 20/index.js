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
    const map = {};
    function reverseString(someString) {
        let newString = "";
        for (let i = someString.length - 1; i >= 0; i--) {
            newString += someString[i];
        }
        return newString;
    }
    function findBorders(table) {
        const borders = [];
        borders.push(table[0]);
        borders.push(table[table.length - 1]);
        let leftBorder = "";
        let rightBorder = "";
        for (let i = 0; i < table.length; i++) {
            leftBorder += table[i][0];
            rightBorder += table[i][table[i].length - 1];
        }
        borders.push(leftBorder);
        borders.push(rightBorder);
        return borders;
    }
    input.forEach((tile) => {
        const index = tile.slice(5, tile.indexOf(":"));
        const table = tile.split("\r\n").slice(1);
        map[index] = findBorders(table);
    });
    // Part 1
    function part1() {
        const corners = [];
        const tileNumbers = Object.keys(map);
        for (let i = 0; i < tileNumbers.length; i++) {
            let counter = 0;
            for (let j = 0; j < map[tileNumbers[i]].length; j++) {
                for (let z = 0; z < tileNumbers.length; z++) {
                    if (z !== i) {
                        const isFound = map[tileNumbers[z]].includes(map[tileNumbers[i]][j]) ||
                            map[tileNumbers[z]].includes(reverseString(map[tileNumbers[i]][j]));
                        if (isFound) {
                            counter++;
                            break;
                        }
                    }
                }
            }
            if (counter === 2) {
                corners.push(Number(tileNumbers[i]));
            }
        }
        console.log("Answer for part 1", corners.reduce((total, value) => (total *= value)));
    }
    part1();
    // Part 2
    function part2() { }
    part2();
});
