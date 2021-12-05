
const reps = {
    '+': 'plus',
    '-': 'dash',
    '*': 'star',
    '/': 'slash',
    '=': 'eq',
    '!': 'exclamation',
    '.': 'dot',
    '<': 'lt',
    '>': 'gt',
};

const named = (name) => {
    let ret = '_';
    for (const chr of name) {
        if (chr.match(/[a-zA-Z0-9_]/)) {
            ret += chr;
        } else if (chr in reps) {
            ret += '$' + reps[chr] + '$';
        } else {
            ret += '$' + String(chr.charCodeAt(0)) + '$';
        }
    }
    return ret;
};

module.exports = named;
