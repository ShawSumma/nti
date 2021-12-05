const rt = `

const _this = globalThis;

const _import = (k, str) => {
    return () => k(require(str));
};

const _wrap = (k1, f) => {
    return () => {
        return k1((k2, ...args) => {
            return async() => k2(await f(...args));
        });
    };
};

const _if = (k, c, t, f) => {
    if (c) {
        return () => t(k);
    } else {
        return () => f(k);
    }
};

const _$eq$ = (k, ...args) => {
    for (let i = 0; i < args.length; i++) {
        for (let j = i + 1; j < args.length; j++) {
            if (!(args[i] === args[j])) {
                return () => k(false);
            }
        }
    }
    return () => k(true);
};

const _$lt$ = (k, ...args) => {
    for (let i = 0; i < args.length; i++) {
        for (let j = i + 1; j < args.length; j++) {
            if (!(args[i] < args[j])) {
                return () => k(false);
            }
        }
    }
    return () => k(true);
};

const _index = (k, v, ind) => {
    return () => k(v[ind]);
};

const _$plus$ = (k, ...args) => {
    let res = args.reduce((x, y) => x + y, 0);
    return () => k(res);
};

const _$dash$ = (k, start, ...args) => {
    if (args.length === 0) {
        return () => k(-start);
    } else {
        let res = args.reduce((x, y) => x - y, start);
        return () => k(res);
    }
};

const _$star$ = (k, ...args) => {
    let res = args.reduce((x, y) => x * y, 1);
    return () => k(res);
};

const _$slash$ = (k, start, ...args) => {
    if (args.length === 0) {
        return () => k(1/start);
    } else {
        let res = args.reduce((x, y) => x / y, start);
        return () => k(res);
    }
};

const _show = (k, v) => {
    console.log(v);
    return () => k(null);
};

const _fork = (k, n) => {
    return () => {
        let ret = [];
        for (let i = 0; i < n; i++) {
            ret.push(k(i));
        }
        return ret
    };
}

const _do = (k, ...args) => {
    return () => k(args.pop());
};

`;

module.exports = rt;
