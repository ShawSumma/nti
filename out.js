

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

let cur = ((r1) => {
    return () => ((r6) => {
        return () => ((r7) => {
            return () => (r6((r2) => {
                return () => ((r4) => {
                    return () => ((r5) => {
                        return () => (r4((r3) => {
                            return () => (r1((end) => {
                                return () => {};
                            },r2, r3));
                        },r5));
                    })(' lol');
                })(_show);
            },r7));
        })(4);
    })(_fork);
})(_do);

let todo = [cur]; while (todo.length !== 0) { let next = todo.shift()(); if (Array.isArray(next)) { todo.push(...next); } else if (next != null) { todo.push(next); } }
