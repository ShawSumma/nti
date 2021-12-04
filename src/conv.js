const {Form, Value, Ident} = require('./ast.js');
const rt = require('./rt.js');
const named = require('./named.js');

const indent = (src) => {
    return src.split('\n').map(x => `     ${x}`).join('\n');
};

const conv = (node) => {
    console.log('/*', node, '*/');
    if (node instanceof Form) {
        if (node.type === 'call') {
            let func = conv(node.args[0]);
            let args = node.args.slice(1).map(conv);
            return `${func}(${args.join(', ')})`;
        }
        if (node.type === 'main') {
            let args = [...node.args];
            let ret = conv(args.pop());
            let stmts = args.map(conv);
            let getres;
            if (args.length !== 0) {
                let body = indent(stmts.join(';\n'));
                let end = indent(`return ${ret}`);
                getres = `let main = (() => {\n${body}\n${end};\n})`;
            } else {
                getres = `let main = (() => ${ret})`;
            }
            return `${rt}\n${getres}\nmain();`
        }
        throw new Error(`unhandled node type: ${node.type}`);
    }
    if (node instanceof Ident) {
        let ret = '';
        for (const chr of node.name) {
            if (/[a-zA-Z0-9_]/.test(chr)) {
                ret += chr;
            } else if (chr in named) {
                ret += '$' + named[chr] + '$';
            } else {
                ret += '$' + String(String.fromCharCode(chr)) + '$';
            }
        }
        return ret;
    }
    if (node instanceof Value) {
        return `${node.value}`;
    }
    throw new Error(`unhandled node: ${node}`);
};

module.exports = conv;