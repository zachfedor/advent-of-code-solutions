const { readInputLines } = require("../utils");

const sample = [
  "$ cd /",
  "$ ls",
  "dir a",
  "14848514 b.txt",
  "8504156 c.dat",
  "dir d",
  "$ cd a",
  "$ ls",
  "dir e",
  "29116 f",
  "2557 g",
  "62596 h.lst",
  "$ cd e",
  "$ ls",
  "584 i",
  "$ cd ..",
  "$ cd ..",
  "$ cd d",
  "$ ls",
  "4060174 j",
  "8033020 d.log",
  "5626152 d.ext",
  "7214296 k "
];
const input = readInputLines();

const buildFilesystem = (cmds) => {
  const fs = {};
  let pwd = "fs";

  while (cmds.length) {
    const cmd = cmds.splice(0, 1)[0];

    if (cmd === "$ cd /") {
      pwd = "fs";
    } else if (cmd.startsWith("$ cd ")) {
      const dir = cmd.replace("$ cd ", "");
      if (dir === "..") {
        let parts = pwd.split(".");
        pwd = parts.slice(0, parts.length - 1).join(".");
      } else {
        pwd += "." + dir;
      }
    } else if (cmd === "$ ls") {
      // find index of next command starting with $
      const nextCommand = cmds.findIndex((l) => l.startsWith("$"));
      // splice from 0 to index to get contents
      const contents = nextCommand > 0 ? cmds.splice(0, nextCommand) : cmds.splice(0);
      // add each to fs at current pwd
      for (let c of contents) {
        const [size, name] = c.split(" ");

        eval(`${pwd}.${name.replace(".", "_")} = ${size === "dir" ? "{}" : size}`);
      }
    }
  }

  return fs;
};

const solve = (fs) => {
  const dirs = [];

  const sizeOfDir = (dir) => {
    const sum = Object.values(dir).reduce((agg, cur) => agg + (typeof cur === "number" ? cur : sizeOfDir(cur)), 0);
    dirs.push(sum);
    return sum;
  }

  sizeOfDir(fs);

  return dirs.filter(d => d <= 100000).reduce((agg, cur) => agg + cur);
};

console.log(solve(buildFilesystem(input)));
