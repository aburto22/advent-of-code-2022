import { getSignalStrenghts } from "./lib";
import path from "node:path";
import fs from "node:fs";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const result = getSignalStrenghts(input);

console.log(result);
