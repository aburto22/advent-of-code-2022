import { longRopeVisitedT } from "./lib";
import path from "node:path";
import fs from "node:fs";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const result = longRopeVisitedT(input, { x: 296, y: 204 }, { x: 201, y: 67 });

console.log(result);
