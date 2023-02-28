export {};
const fs = require("fs");

// Reading input data from file
fs.readFile("./input.txt", { encoding: "utf8" }, (err: any, data: string) => {
  if (err) {
    console.log(typeof err);
    return;
  }
  // console.log([data]);

  const input: string[] = data.split("\r\n");
  // console.log(input);

  const allergensFound: { [allergen: string]: string } = {};

  // Part 1
  function part1() {
    const map: { [allergen: string]: string[] } = {};
    let products: string[] = [];

    input.forEach((line) => {
      const dividedLine: string[] = line.split(" (");
      dividedLine[0].split(" ").forEach((name) => {
        if (!products.includes(name)) {
          products.push(name);
        }
      });
      const allergens: string[] = dividedLine[1]
        .slice("contains ".length, dividedLine[1].length - 1)
        .split(", ");
      allergens.forEach((allergen) => {
        if (map[allergen]) {
          map[allergen] = dividedLine[0]
            .split(" ")
            .filter((all) => map[allergen].includes(all));
        } else {
          map[allergen] = dividedLine[0].split(" ");
        }
      });
    });

    while (Object.keys(map).length > 0) {
      Object.keys(map).forEach((allergen) => {
        if (map[allergen].length === 1) {
          const product: string = map[allergen][0];
          allergensFound[allergen] = product;
          delete map[allergen];
          Object.keys(map).forEach((allergen) => {
            map[allergen] = map[allergen].filter((name) => name !== product);
          });
          const index: number = products.indexOf(product);
          products = [
            ...products.slice(0, index),
            ...products.slice(index + 1),
          ];
        }
      });
    }

    let counter: number = 0;
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
    console.log(
      "Answer for part 2",
      Object.keys(allergensFound)
        .sort()
        .map((all) => allergensFound[all])
        .join(",")
    );
  }
  part2();
});
