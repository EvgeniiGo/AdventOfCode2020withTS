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
    const allergensFound = {};
    // Part 1
    function part1() {
        const map = {};
        let products = [];
        input.forEach((line) => {
            const dividedLine = line.split(" (");
            dividedLine[0].split(" ").forEach((name) => {
                if (!products.includes(name)) {
                    products.push(name);
                }
            });
            const allergens = dividedLine[1]
                .slice("contains ".length, dividedLine[1].length - 1)
                .split(", ");
            allergens.forEach((allergen) => {
                if (map[allergen]) {
                    map[allergen] = dividedLine[0]
                        .split(" ")
                        .filter((all) => map[allergen].includes(all));
                }
                else {
                    map[allergen] = dividedLine[0].split(" ");
                }
            });
        });
        while (Object.keys(map).length > 0) {
            Object.keys(map).forEach((allergen) => {
                if (map[allergen].length === 1) {
                    const product = map[allergen][0];
                    allergensFound[allergen] = product;
                    delete map[allergen];
                    Object.keys(map).forEach((allergen) => {
                        map[allergen] = map[allergen].filter((name) => name !== product);
                    });
                    const index = products.indexOf(product);
                    products = [
                        ...products.slice(0, index),
                        ...products.slice(index + 1),
                    ];
                }
            });
        }
        let counter = 0;
        products.forEach((product) => {
            input.forEach((line) => {
                if (line.split(" ").includes(product)) {
                    counter++;
                }
            });
        });
        console.log("Answer for part 1", counter);
    }
    part1();
    // Part 2
    function part2() {
        console.log("Answer for part 2", Object.keys(allergensFound)
            .sort()
            .map((all) => allergensFound[all])
            .join(","));
    }
    part2();
});
