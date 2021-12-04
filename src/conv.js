const {Form, Value, Ident} = require('./ast.js');
const rt = require('./rt.js');
const named = require('./named.js');

const indent = (src) => {
    return src.split('\n').map(x => `     ${x}`).join('\n');
};

const conv = (node) => {
    if (node instanceof Form) {
        if (node.type === 'call') {
            let func = node.args[0].name;
            let self = conv(node.args[1])
            let args = node.args.slice(2).map(conv);
            return `${self}['${func}'](${args.map(x => `() => ${x}`).join(', ')})`;
        }
        if (node.type === 'if') {
            if (node.args.length == 2) {
                let cond = conv(node.args[0]);
                let iftrue = conv(node.args[1]);
                return `${cond} ? ${iftrue} : null`;
            } else if (node.args.length == 3) {
                let cond = conv(node.args[0]);
                let iftrue = conv(node.args[1]);
                let iffalse = conv(node.args[2]);
                return `${cond} ? ${iftrue} : ${iffalse}`;
            } else {
                throw new Error(`wrong argc for if: ${node.args.length}`);
            }
        }
        if (node.type === 'let') {
            let setto = conv(node.args[0]);
            let value = conv(node.args[1]);
            return `(${setto} = ${value})`;
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
        return named(node.name);
    }
    if (node instanceof Value) {
        if (typeof(node.value) === 'number') {
            return `$number_literal(${node.value})`
        } else {
            return `$string_literal('${node.value}')`;
        }
    }
    throw new Error(`unhandled node: ${node}`);
};

module.exports = conv;