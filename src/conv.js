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

const collect = (node) => {
    if (node instanceof Form) {
        let ret = [];
        for (const arg of node.args) {
            ret.push(...collect(arg));
        }
        return ret;
    } else {
        return [node];
    }
};

const conv = (node, cont, sym, vars) => {
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
                k = conv(arg, k, args.pop(), vars);
                n += 1;
            }
            return k;
        }
        if (node.type === 'if') {
            let iftrue = new Form('fun', new Form('call'), node.args[1]);
            let iffalse = new Form('fun', new Form('call'), node.args[2]);
            let cond = new Form('call', new Ident('if'), node.args[0], iftrue, iffalse);
            return conv(cond, cont, sym, vars);
        }
        if (node.type === 'let') {
            let name = named(node.args[0].name);
            vars.push(name);
            let k = `{\n${indent(`${name} = ${sym};\nreturn () => ${cont};`)};\n}`;
            k = conv(node.args[1], k, sym, vars);
            return k;
        }
        if (node.type === 'fun') {
            let k = (`{\n${indent(`return () => ${cont};`)};\n}`);
            let args = collect(node.args[0]).map(x => named(x.name));
            let contname = genname();
            let res = genname();
            let contval = `${contname}(${res})`
            let fvars = [];
            let body = conv(node.args[1], contval, res, fvars);
            body = indent(`\n${fvars.map(x => `let ${x} = null;\n`).join('')}return ${body};\n`);
            let fun = `(${contname}, ${args.join(', ')}) => {${body}}`;
            return `((${sym}) => ${k})(${fun})`;
        }
        throw new Error(`unhandled node type: ${node.type}`);
    }
    if (node instanceof Ident) {
        let k = (`{\n${indent(`return () => ${cont};`)};\n}`);
        if (node.name === 'cc') {
            return `((cc) => {cc(cc)})((${sym}) => ${k})`;
        }
        return `((${sym}) => ${k})(${named(node.name)})`;
    }
    if (node instanceof Value) {
        let k = (`{\n${indent(`return () => ${cont};`)};\n}`);
        if (typeof (node.value) === 'number') {
            return `((${sym}) => ${k})(${node.value})`;
        } else {
            return `((${sym}) => ${k})('${node.value}')`;
        }
    }
    throw new Error(`unhandled node: ${node}`);
};

module.exports = (ast) => {
    let vars = [];
    let expr = conv(ast, '{}', 'end', vars);
    let val = '';
    for (let cur of vars) {
        val += `var ${cur} = null;\n`;
    }
    val += `let main = ${expr};\n`;
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