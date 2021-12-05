

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

let main = ((r1) => {
    return () => ((r14) => {
        return () => ((r15) => {
            return () => (r14((r2) => {
                return () => {
                    let _fs = r2;
                    return () => ((r9) => {
                        return () => ((r11) => {
                            return () => ((r12) => {
                                return () => ((r13) => {
                                    return () => (r11((r10) => {
                                        return () => (r9((r3) => {
                                            return () => {
                                                let _read = r3;
                                                return () => ((r5) => {
                                                    return () => ((r7) => {
                                                        return () => ((r8) => {
                                                            return () => (r7((r6) => {
                                                                return () => (r5((r4) => {
                                                                    return () => (r1((end) => {
                                                                        return () => {};
                                                                    },r2, r3, r4));
                                                                },r6));
                                                            },r8));
                                                        })('out.js');
                                                    })(_read);
                                                })(_show);
                                            };
                                        },r10));
                                    },r12, r13));
                                })('readFile');
                            })(_fs);
                        })(_index);
                    })(_wrap);
                };
            },r15));
        })('fs/promises');
    })(_import);
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
