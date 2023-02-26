export {};
const fs = require("fs");

// Reading input data from file
fs.readFile("./input.txt", { encoding: "utf8" }, (err: any, data: string) => {
  if (err) {
    console.log(typeof err);
    return;
  }
  // console.log([data]);

  const input: string[] = data.split("\r\n\r\n");
  // console.log(input);

  const rules: string[] = input[0].split("\r\n");
  const myTicket: number[] = input[1]
    .split("\r\n")[1]
    .split(",")
    .map((value) => Number(value));
  const tickets: number[][] = input[2]
    .split("\r\n")
    .slice(1)
    .map((ticket) => ticket.split(",").map((value) => Number(value)));

  let values: number[] = [];
  let rulesMap: { [rule: string]: number[] } = {};
  rules.forEach((rule) => {
    const index: number = rule.indexOf(":");
    const indexOfOr: number = rule.indexOf(" or ");
    const firstValues: string[] = rule.slice(index + 2, indexOfOr).split("-");
    const secondValues: string[] = rule.slice(indexOfOr + 4).split("-");
    const name: string = rule.slice(0, index);
    rulesMap[name] = [];

    function addValues(arr: string[], name: string): void {
      for (let i = Number(arr[0]); i <= Number(arr[1]); i++) {
        rulesMap[name] = [...rulesMap[name], i];
        if (!values.includes(i)) {
          values.push(i);
        }
      }
    }

    addValues(firstValues, name);
    addValues(secondValues, name);
  });

  // Part 1
  function part1() {
    let rate: number = 0;
    tickets.forEach((ticket) => {
      ticket.forEach((value) => {
        if (!values.includes(value)) {
          rate += value;
        }
      });
    });

    console.log("Answer for part 1", rate);
  }
  part1();

  // Part 2
  function part2() {
    const map: { [name: string]: { [value: number]: number } } = {};
    Object.keys(rulesMap).forEach((name) => {
      map[name] = {};
      for (let i = 0; i < myTicket.length; i++) {
        map[name][i] = 0;
      }
    });

    let validTickets: number[][] = [];
    tickets.forEach((ticket) => {
      let isValid = true;
      ticket.forEach((value) => {
        if (!values.includes(value)) {
          isValid = false;
        }
      });
      if (isValid) {
        validTickets.push(ticket);
      }
    });

    validTickets.forEach((ticket) => {
      for (let i = 0; i < ticket.length; i++) {
        const value: number = ticket[i];
        Object.keys(rulesMap).forEach((name) => {
          if (rulesMap[name].includes(value)) {
            map[name][i] = map[name][i] + 1;
          }
        });
      }
    });

    const q = validTickets.length;

    const order: { [name: string]: number } = {};
    for (let i = 0; i <= Object.keys(map).length; i++) {
      Object.keys(map).forEach((name) => {
        const values = Object.values(map[name]);
        if (values.includes(q)) {
          if (values.indexOf(q) === values.lastIndexOf(q)) {
            order[name] = values.indexOf(q);
            Object.keys(map).forEach((key) => {
              map[key][values.indexOf(q)] = Infinity;
            });
          }
        }
      });
    }
    // console.log(order);
    let multiplication: number = 1;
    Object.keys(order)
      .filter((name) => name.startsWith("departure"))
      .forEach((name) => {
        const index: number = order[name];
        multiplication *= myTicket[index];
      });

    console.log("Answer for part 2", multiplication);
  }

  part2();
});
