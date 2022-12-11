import { getMonkeyBusiness } from "./lib";
import path from "node:path";
import fs from "node:fs";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const result = getMonkeyBusiness(input, 20, true);

console.log(result);
