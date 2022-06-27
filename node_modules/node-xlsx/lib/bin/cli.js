#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const __1 = require("./..");
const [action = 'build', ...args] = process.argv.slice(2);
const readStdin = async (bufferSize) => {
    return new Promise((resolve) => {
        const buffers = [];
        process.stdin.on('readable', () => {
            const read = process.stdin.read();
            if (read) {
                buffers.push(read);
            }
        });
        process.stdin.on('end', () => {
            resolve(Buffer.concat(buffers, bufferSize));
        });
    });
};
const main = async () => {
    switch (action) {
        case 'build': {
            const stdin = JSON.parse((await readStdin()).toString('utf8'));
            const result = (0, __1.build)(stdin);
            await (0, promises_1.writeFile)(args[0] || `${process.cwd()}/out.xlsx`, result);
            break;
        }
        default:
            console.log('Sorry, that is not something I know how to do.');
    }
    process.exit(0);
};
main();
