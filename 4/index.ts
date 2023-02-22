export {};
const fs = require("fs");

// Reading input data from file
fs.readFile("./input.txt", { encoding: "utf8" }, (err: any, data: string) => {
  if (err) {
    console.log(typeof err);
    return;
  }
  // console.log([data]);

  const input: string[] = data.split("\r\n\r\n").map((line) => {
    return line.replaceAll("\r\n", " ");
  });

  // console.log(input);
  const BYR: string = "byr";
  const IYR: string = "iyr";
  const EYR: string = "eyr";
  const HGT: string = "hgt";
  const HCL: string = "hcl";
  const ECL: string = "ecl";
  const PID: string = "pid";
  const CID: string = "cid";

  // Part 1
  function part1() {
    let counter: number = 0;
    input.forEach((doc) => {
      const data: string[] = doc.split(" ").map((field) => {
        return field.slice(0, field.indexOf(":"));
      });
      if (data.length >= 7) {
        if (
          data.includes(BYR) &&
          data.includes(IYR) &&
          data.includes(EYR) &&
          data.includes(HGT) &&
          data.includes(HCL) &&
          data.includes(ECL) &&
          data.includes(PID)
        ) {
          counter++;
        }
      }
    });
    console.log("Answer for part 1:", counter);
  }
  part1();

  // Part 2
  function part2() {
    function isValid(line: string): boolean {
      const field: string[] = line.split(":");
      let isValid: boolean;
      switch (field[0]) {
        case BYR: {
          const year: number = Number(field[1]);
          if (year >= 1920 && year <= 2002) {
            isValid = true;
          } else {
            isValid = false;
          }
          break;
        }

        case IYR: {
          const year: number = Number(field[1]);
          if (year >= 2010 && year <= 2020) {
            isValid = true;
          } else {
            isValid = false;
          }
          break;
        }

        case EYR: {
          const year: number = Number(field[1]);
          if (year >= 2020 && year <= 2030) {
            isValid = true;
          } else {
            isValid = false;
          }
          break;
        }

        case HGT: {
          if (field[1].length < 4) {
            isValid = false;
          } else {
            const index: number = field[1].length - 2;
            if (
              field[1].slice(index) !== "cm" &&
              field[1].slice(index) !== "in"
            ) {
              isValid = false;
            } else {
              const height: number = Number(field[1].slice(0, index));
              if (
                (field[1].slice(index) === "cm" &&
                  height >= 150 &&
                  height <= 193) ||
                (field[1].slice(index) === "in" && height >= 59 && height <= 76)
              ) {
                isValid = true;
              } else {
                isValid = false;
              }
            }
          }
          break;
        }
        case HCL: {
          if (field[1].match(/^#[0-9a-f]{6}$/)) {
            isValid = true;
          } else {
            isValid = false;
          }
          break;
        }
        case ECL: {
          const colors: string[] = [
            "amb",
            "blu",
            "brn",
            "gry",
            "grn",
            "hzl",
            "oth",
          ];
          if (colors.includes(field[1])) {
            isValid = true;
          } else {
            isValid = false;
          }
          break;
        }
        case PID: {
          if (field[1].match(/^[0-9]{9}$/)) {
            isValid = true;
          } else {
            isValid = false;
          }
          break;
        }
        default: {
          isValid = true;
          break;
        }
      }
      return isValid;
    }
    let counter: number = 0;
    input.forEach((doc) => {
      const data: string[] = doc.split(" ");
      if (data.length >= 7) {
        const fields: string[] = data.map((field) => {
          return field.slice(0, field.indexOf(":"));
        });
        if (
          fields.includes(BYR) &&
          fields.includes(IYR) &&
          fields.includes(EYR) &&
          fields.includes(HGT) &&
          fields.includes(HCL) &&
          fields.includes(ECL) &&
          fields.includes(PID) &&
          data.every((field) => isValid(field))
        ) {
          counter++;
        }
      }
    });
    console.log("Answer for part 2:", counter);
  }
  part2();
});
