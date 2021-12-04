const {Form, Value, Ident} = require('./ast.js');

const splint = (line) => {
    let ret = [];
    let cur = '';
    let count = 0;
    let start = 0;
    for (const chr of line) {
        count += 1;
        if (chr === ' ') {
            if (cur !== '') {
                ret.push([start, cur]);
            }
            cur = '';
            start = count;
        } else {
            cur += chr;
        }
    }
    if (cur !== '') {
        ret.push([start, cur]);
    }
    return ret;
};

const parseWord = (word) => {
    if (/-?[0-9]+/.test(word)) {
        return new Value(Number(word));
    }
    return new Ident(word);
};

const parse = (src) => {
    const lines = src.split('\n');
    let calls = [new Form('main')];
    let lno = 1;
    for (const line of lines) {
        let trimmed = line.trimLeft();
        let count = line.length - trimmed.length;
        let words = splint(line);
        if (words.length === 0) {
            continue;
        }
        while (calls.length > count + 2) {
            calls.pop();
        }
        let [last, argStr] = words.pop();
        let arg = parseWord(argStr);
        for (const word of words.reverse()) {
            let [indent, src] = word;
            arg = new Form('call', parseWord(src), arg);
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
