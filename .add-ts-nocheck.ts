import { close, openSync, readFileSync, writeSync } from 'fs';

const file = 'src/graphql/types.ts';
const data = readFileSync(file); //read existing contents into data
const fd = openSync(file, 'w+');
const buffer = Buffer.from('// @ts-nocheck');

writeSync(fd, buffer, 0, buffer.length, 0); //write new data
writeSync(fd, data, 0, data.length, buffer.length); //append old data
// or fs.appendFile(fd, data);
close(fd);
