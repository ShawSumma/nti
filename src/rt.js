const rt = `
const load = Symbol('store');
const arg = (v) => v();

const _true = {
    'if': (...args) => {
        return arg(args[0]);
    },

    'not': () => {
        return _false;
    },
};

const _false = {
    'if': (...args) => {
        return arg(args[1]);
    },

    'not': () => {
        return _true;
    },
};

const $empty_literal = () => {
    return {
        'show': () => {
            console.log('none');
            return $empty_literal();
        },
    };
};

const $number_literal = (num) => {
    return  {
        [load]: num,
        'show': () => {
            console.log(num);
            return $empty_literal();
        },
        '+': (...args) => {
            let ret = num;
            for (const val of args) {
                ret += arg(val)[load];
            }
            return $number_literal(ret);
        },
        '*': (...args) => {
            let ret = num;
            for (const val of args) {
                ret *= arg(val)[load];
            }
            return $number_literal(ret);
        },
        '-': (...args) => {
            if (args.length === 0) {
                return $number_literal(0-num);
            }
            let ret = num;
            for (const val of args) {
                ret -= arg(val)[load];
            }
            return $number_literal(ret);
        },
        '/': (...args) => {
            if (args.length === 0) {
                return $number_literal(1/num);
            }
            let ret = num;
            for (const val of args) {
                ret /= arg(val)[load];
            }
            return $number_literal(ret);
        },
        '=': (...args) => {
            if (num === arg(args[0])[load]) {
                return _true;
            } else {
                return _false;
            }
        },
    };
};

const $string_literal = (str) => {
    return {
        [load]: str,
        'show': (...args) => {
            console.log(str);
            return $empty_literal();
        },
        'concat': (...args) => {
            let ret = str;
            for (const str of args) {
                ret += arg(str)(load);
            }
            return $string_literal(ret);
        },
    };
};

`;

module.exports = rt;
