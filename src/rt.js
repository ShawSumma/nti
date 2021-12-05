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

const _index = (k, v, ind) => {
    return () => k(v[ind]);
};

const _$plus$ = (k, x, y) => {
    return () => k(x + y);
};

const _$star$ = (k, x, y) => {
    return () => k(x * y);
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
