import { getNumberCalories } from "./lib";
import path from "node:path";
import fs from "node:fs";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const result = getNumberCalories(input, 1);

console.log(result);
