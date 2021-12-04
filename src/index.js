const fs = require('fs/promises');
const parse = require('./parse.js');
const conv = require('./conv.js');

const read = async(name) => {
    return String(await fs.readFile(name));
};

const main = async(args) => {
    const src = await read(args[0]);
    const ast = parse(src);
    const js = conv(ast);
    console.log(js);
};

main(process.argv.slice(2))
