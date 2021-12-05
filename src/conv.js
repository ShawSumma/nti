const { Form, Value, Ident } = require('./ast.js');
const rt = require('./rt.js');
const named = require('./named.js');

const indent = (src) => {
    return src.split('\n').map(x => `    ${x}`).join('\n');
};

let nnames = 0;

const genname = () => {
    nnames += 1;
    return `r${nnames}`;
}

const conv = (node, cont, sym) => {
    if (node instanceof Form) {
        if (node.type === 'call') {
            let k = (`{\n${indent(`return () => ${cont};`)}\n}`);
            let n = 0;
            let args = [];
            for (let arg of node.args) {
                args.push(genname());
            }
            let argstr = args.slice(1).join(', ');
            k = `(${args[0]}((${sym}) => ${k},${argstr}))`
            for (let arg of node.args.reverse()) {
                k = conv(arg, k, args.pop());
                n += 1;
            }
            return k;
        }
        if (node.type === 'let') {
            let name = named(node.args[0].name);
            let k = `{\n${indent(`let ${name} = ${sym};\nreturn () => ${cont};`)}\n}`;
            k = conv(node.args[1], k, sym);
            return k;
        }
        throw new Error(`unhandled node type: ${node.type}`);
    }
    if (node instanceof Ident) {
        let k = (`{\n${indent(`return () => ${cont};`)}\n}`);
        if (node.name === 'cc') {
            return `((cc) => {cc(cc)})((${sym}) => ${k})`;
        }
        return `((${sym}) => ${k})(${named(node.name)})`;
    }
    if (node instanceof Value) {
        let k = (`{\n${indent(`return () => ${cont};`)}\n}`);
        if (typeof (node.value) === 'number') {
            return `((${sym}) => ${k})(${node.value})`;
        } else {
            return `((${sym}) => ${k})('${node.value}')`;
        }
    }
    throw new Error(`unhandled node: ${node}`);
};

module.exports = (ast) => {
    let expr = conv(ast, '{}', 'end');
    let val = `let main = ${expr};\n`;
    val += `
(async(cur) => {
    let todo = [cur];
    while (todo.length !== 0) {
        let next = await todo.shift()();
        if (Array.isArray(next)) { 
            todo.push(...next);
        } else if (next != null) {
            todo.push(next);
        }
    }
})(main)`;
    return rt + val;
};