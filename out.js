

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

var _fib = null;
let main = ((r1) => {
    return () => ((r2) => {
        return () => {
            _fib = r2;
            return () => ((r9) => {
                return () => ((r10) => {
                    return () => (r9((r3) => {
                        return () => ((r5) => {
                            return () => ((r7) => {
                                return () => ((r8) => {
                                    return () => (r7((r6) => {
                                        return () => (r5((r4) => {
                                            return () => (r1((end) => {
                                                return () => {};
                                            },r2, r3, r4));
                                        },r6));
                                    },r8));;
                                })(28);;
                            })(_fib);;
                        })(_show);
                    },r10));;
                })(5);;
            })(_fork);;
        };;
    })((r11, _n) => {    
        return ((r13) => {
            return () => ((r34) => {
                return () => ((r35) => {
                    return () => ((r36) => {
                        return () => (r34((r14) => {
                            return () => ((r15) => {
                                return () => ((r16) => {
                                    return () => (r13((r12) => {
                                        return () => r11(r12);
                                    },r14, r15, r16));;
                                })((r17, ) => {    
                                    return ((r19) => {
                                        return () => ((r27) => {
                                            return () => ((r29) => {
                                                return () => ((r30) => {
                                                    return () => ((r31) => {
                                                        return () => (r29((r28) => {
                                                            return () => (r27((r20) => {
                                                                return () => ((r22) => {
                                                                    return () => ((r24) => {
                                                                        return () => ((r25) => {
                                                                            return () => ((r26) => {
                                                                                return () => (r24((r23) => {
                                                                                    return () => (r22((r21) => {
                                                                                        return () => (r19((r18) => {
                                                                                            return () => r17(r18);
                                                                                        },r20, r21));
                                                                                    },r23));
                                                                                },r25, r26));;
                                                                            })(1);;
                                                                        })(_n);;
                                                                    })(_$dash$);;
                                                                })(_fib);
                                                            },r28));
                                                        },r30, r31));;
                                                    })(2);;
                                                })(_n);;
                                            })(_$dash$);;
                                        })(_fib);;
                                    })(_$plus$);
                                    });;
                            })((r32, ) => {    
                                return ((r33) => {
                                    return () => r32(r33);;
                                })(_n);
                                });
                        },r35, r36));;
                    })(2);;
                })(_n);;
            })(_$lt$);;
        })(_if);
        });;
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
