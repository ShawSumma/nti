const {Node, Form, String, Number, Ident} = require('./ast.js');

let forms = ['let', 'fun', 'if'];

const parseWord = (word) => {
    if (forms.indexOf(word) !== -1) {
        return word;
    }
    if (!isNaN(word[0])) {
        return new Number(word);
    }
    let split = word.split('.');
    if (split.length === 1) {
        return new Ident(word);
    }
    let val = new Ident(split.shift());
    for (const ind of split) {
        val = new Form('call', new Ident('index'), val, new String(ind));
    }
    return val;
};

const splint = (line) => {
    let ret = [];
    let cur = '';
    let count = 0;
    let start = 0;
    for (const chr of line) {
        count += 1;
        if (chr == ':') {
            ret.push([start, new String(line.slice(count))]);
            break;
        }
        if (chr === ' ') {
            if (cur !== '') {
                ret.push([start, parseWord(cur)]);
            }
            cur = '';
            start = count;
        } else {
            cur += chr;
        }
    }
    if (cur !== '') {
        ret.push([start, parseWord(cur)]);
    }
    return ret;
};

const parse = (src) => {
    const lines = src.split('\n');
    let calls = [new Form('call', new Ident('do'))];
    let lno = 1;
    for (const line of lines) {
        let trimmed = line.trimLeft();
        let count = line.length - trimmed.length;
        let words = splint(line);
        if (words.length === 0) {
            continue;
        }
        let [last, arg] = words.pop();
        for (const word of words.reverse()) {
            let [indent, src] = word;
            if (src instanceof Node) {
                arg = new Form('call', src, arg);
            } else {
                arg = new Form(src, arg);
            }
            calls[last] = arg;
            last = indent;
        }
        if (!(calls[count] instanceof Form)) {
            throw new Error(`bad indentation on line: ${lno}`)
        }
        calls[count].add(arg);
        lno += 1;
    }
    return calls[0];
};

module.exports = parse;
