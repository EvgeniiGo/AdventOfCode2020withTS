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
        const buses = input[1]
            .split(",")
            .filter((bus) => bus !== "x")
            .map((bus) => Number(bus));
        const timestamp = Number(input[0]);
        let timeToWait = timestamp;
        let bestBus = Infinity;
        buses.forEach((bus) => {
            const time = bus - (timestamp % bus);
            if (time < timeToWait) {
                timeToWait = time;
                bestBus = bus;
            }
        });
        console.log("Answer for part 1", bestBus * timeToWait);
    }
    part1();
    // Part 2
    function part2() {
        const buses = input[1].split(",").map((bus) => {
            if (bus === "x") {
                return 0;
            }
            else {
                return Number(bus);
            }
        });
        let intersection = 0;
        let multiplicator = buses[0];
        let time = 0;
        for (let i = 1; i < buses.length; i++) {
            if (buses[i] !== 0) {
                while (true) {
                    if (buses[i] - (time % buses[i]) !== i % buses[i]) {
                        time += multiplicator;
                    }
                    else {
                        multiplicator *= buses[i];
                        intersection = time;
                        break;
                    }
                }
            }
        }
        console.log("Answer for part 2", time);
    }
    part2();
});
