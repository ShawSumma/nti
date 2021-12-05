
const _math = require('mathjs');

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

const _$plus$ = (k, lhs, rhs) => {
    return () => lhs.add(k, lhs, rhs);
}

const _$dash$ = (k, lhs, rhs) => {
    return () => lhs.sub(k, lhs, rhs);
}

const _$star$ = (k, lhs, rhs) => {
    return () => lhs.mul(k, lhs, rhs);
}

const _$slash$ = (k, lhs, rhs) => {
    return () => lhs.div(k, lhs, rhs);
}

const cmp = (f) => (k, lhs, rhs) => {
    return () => lhs.cmp(v => k(f(v)), lhs, rhs);
}

const _$eq$ = cmp(x => x.value === 0);
const _$neq$ = cmp(x => x.value !== 0);
const _$lt$ = cmp(x => x.value < 0);
const _$gt$ = cmp(x => x.value > 0);
const _$lt$$eq$ = cmp(x => x.value <= 0);
const _$gt$$eq$ = cmp(x => x.value >= 0);

const _if = (k, c, t, f) => {
    if (c) {
        return () => t(k);
    } else {
        return () => f(k);
    }
};

const _show = (k, ...values) => {
    let args = [];
    for (let v of values) {
        if (v.value != null) {
            args.push(v.value);
        } else {
            args.push(v);
        }
    }
    console.log(...args);
    return () => k(null);
};

const _do = (k, ...args) => {
    return () => k(args.pop());
};

const num_type = {
    toString: () => {
        return String(this.value);
    },
    add: (k, lhs, rhs) => {
        return () => k(_num(_math.add(lhs.value, rhs.value)));
    },
    sub: (k, lhs, rhs) => {
        return () => k(_num(_math.subtract(lhs.value, rhs.value)));
    },
    mul: (k, lhs, rhs) => {
        return () => k(_num(_math.multiply(lhs.value, rhs.value)));
    },
    div: (k, lhs, rhs) => {
        return () => k(_num(_math.divide(lhs.value, rhs.value)));
    },
    neg: (k, lhs) => {
        return () => k(_num(_math.subtract(0, lhs.value)));
    },
    inv: (k, lhs) => {
        return () => k(_num(_math.divide(0, lhs.value)));
    },
    cmp: (k, lhs, rhs) => {
        return () => k(_num(_math.compare(lhs.value, rhs.value)));
    },
};

const _num = (n) => {
    let ret = Object.create(num_type);
    ret.value = n;
    return ret;
}

const unum = (n, u) => _num(_math.unit(_math.bignumber(n), u))
const num = (n) => _num(_math.bignumber(n));
let main = ((r1) => {
    return () => ((r3) => {
        return () => ((r5) => {
            return () => ((r6) => {
                return () => ((r7) => {
                    return () => ((r8) => {
                        return () => (r5((r4) => {
                            return () => (r3((r2) => {
                                return () => (r1((end) => {
                                    return () => {};
                                },r2));
                            },r4));
                        },r6, r7, r8));;
                    })(unum('2', 'm'));;
                })(unum('1', 'm'));;
            })(unum('1', 'm'));;
        })(_$lt$$eq$);;
    })(_show);;
})(_do);

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
})(main)
