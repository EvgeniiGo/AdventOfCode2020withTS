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
    let input = data.split("").map((val) => Number(val));
    // console.log(input);
    // Part 1
    function part1() {
        let numbers = [...input];
        function move(arr) {
            const current = arr[0];
            const pickedUp = arr.slice(1, 4);
            const leftDown = arr.slice(4);
            let destination = current - 1;
            while (!leftDown.includes(destination)) {
                if (destination === 0) {
                    destination = Math.max(...numbers) + 1;
                }
                destination--;
            }
            const index = leftDown.indexOf(destination);
            const newArr = leftDown
                .slice(0, index + 1)
                .concat(pickedUp, leftDown.slice(index + 1), current);
            return newArr;
        }
        for (let i = 0; i < 100; i++) {
            numbers = move(numbers);
        }
        const index = numbers.indexOf(1);
        console.log(numbers.slice(index + 1).join("") + numbers.slice(0, index).join(""));
    }
    part1();
    // Part 2
    function part2() { }
    part2();
});
