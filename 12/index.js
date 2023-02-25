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
    const directions = {
        N: 0,
        E: 90,
        S: 180,
        W: 270,
    };
    let Directions;
    (function (Directions) {
        Directions["North"] = "N";
        Directions["East"] = "E";
        Directions["South"] = "S";
        Directions["West"] = "W";
    })(Directions || (Directions = {}));
    const values = {
        0: Directions.North,
        90: Directions.East,
        180: Directions.South,
        270: Directions.West,
    };
    // Part 1
    function part1() {
        const pos = {
            N: 0,
            E: 0,
            S: 0,
            W: 0,
            dir: Directions.East,
        };
        input.forEach((line) => {
            const action = line[0];
            const value = Number(line.slice(1));
            if (action === "F") {
                pos[pos.dir] = pos[pos.dir] + value;
            }
            else if (action === "R") {
                pos.dir = values[(directions[pos.dir] + value) % 360];
            }
            else if (action === "L") {
                pos.dir = values[(360 + (directions[pos.dir] - value)) % 360];
            }
            else if (action === "N" ||
                action === "E" ||
                action === "S" ||
                action === "W") {
                pos[action] = pos[action] + value;
            }
        });
        const distance = Math.abs(pos.N - pos.S) + Math.abs(pos.E - pos.W);
        console.log("Answer for part 1", distance);
    }
    part1();
    // Part 2
    function part2() {
        const ship = {
            N: 0,
            E: 0,
            S: 0,
            W: 0,
        };
        const waypoint = {
            N: 1,
            E: 10,
            S: 0,
            W: 0,
        };
        input.forEach((line) => {
            const action = line[0];
            const value = Number(line.slice(1));
            if (action === "N" ||
                action === "E" ||
                action === "S" ||
                action === "W") {
                waypoint[action] = waypoint[action] + value;
                if (waypoint["N"] > waypoint["S"]) {
                    waypoint["N"] = waypoint["N"] - waypoint["S"];
                    waypoint["S"] = 0;
                }
                else {
                    waypoint["S"] = waypoint["S"] - waypoint["N"];
                    waypoint["N"] = 0;
                }
                if (waypoint["W"] > waypoint["E"]) {
                    waypoint["W"] = waypoint["W"] - waypoint["E"];
                    waypoint["E"] = 0;
                }
                else {
                    waypoint["E"] = waypoint["E"] - waypoint["W"];
                    waypoint["W"] = 0;
                }
            }
            else if (action === "R") {
                const copyWaypoint = Object.assign({}, waypoint);
                switch (value) {
                    case 90: {
                        waypoint["N"] = copyWaypoint["W"];
                        waypoint["E"] = copyWaypoint["N"];
                        waypoint["S"] = copyWaypoint["E"];
                        waypoint["W"] = copyWaypoint["S"];
                        break;
                    }
                    case 180: {
                        waypoint["N"] = copyWaypoint["S"];
                        waypoint["E"] = copyWaypoint["W"];
                        waypoint["S"] = copyWaypoint["N"];
                        waypoint["W"] = copyWaypoint["E"];
                        break;
                    }
                    case 270: {
                        waypoint["N"] = copyWaypoint["E"];
                        waypoint["E"] = copyWaypoint["S"];
                        waypoint["S"] = copyWaypoint["W"];
                        waypoint["W"] = copyWaypoint["N"];
                        break;
                    }
                }
            }
            else if (action === "L") {
                const copyWaypoint = Object.assign({}, waypoint);
                switch (value) {
                    case 90: {
                        waypoint["N"] = copyWaypoint["E"];
                        waypoint["E"] = copyWaypoint["S"];
                        waypoint["S"] = copyWaypoint["W"];
                        waypoint["W"] = copyWaypoint["N"];
                        break;
                    }
                    case 180: {
                        waypoint["N"] = copyWaypoint["S"];
                        waypoint["E"] = copyWaypoint["W"];
                        waypoint["S"] = copyWaypoint["N"];
                        waypoint["W"] = copyWaypoint["E"];
                        break;
                    }
                    case 270: {
                        waypoint["N"] = copyWaypoint["W"];
                        waypoint["E"] = copyWaypoint["N"];
                        waypoint["S"] = copyWaypoint["E"];
                        waypoint["W"] = copyWaypoint["S"];
                        break;
                    }
                }
            }
            else if (action === "F") {
                ship["N"] = value * waypoint["N"] + ship["N"];
                ship["E"] = value * waypoint["E"] + ship["E"];
                ship["S"] = value * waypoint["S"] + ship["S"];
                ship["W"] = value * waypoint["W"] + ship["W"];
            }
        });
        const distance = Math.abs(ship.N - ship.S) + Math.abs(ship.E - ship.W);
        console.log("Answer for part 2", distance);
    }
    part2();
});
