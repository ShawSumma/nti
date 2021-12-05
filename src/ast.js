const Node = class {};

const Form = class extends Node {
    constructor(type, ...args) {
        super();
        this.type = type;
        this.args = [];
        this.add(...args);
    }

    add(...args) {
        for (const arg of args) {
            if (Array.isArray(arg)) {
                this.add(...arg);
            } else {
                this.args.push(arg);
            }
        }
    }

    expr() {
        return `(${this.type} ${this.args.map(x => x.expr()).join(' ')})`;
    }
};

const String = class extends Node {
    constructor(val) {
        super();
        this.value = val;
    }

    expr() {
        return `'${this.value}'`
    }
};

const Number = class extends Node {
    constructor(val) {
        super();
        this.value = val;
    }

    expr() {
        return `#${this.value}`
    }
};

const Ident = class extends Node {
    constructor(word) {
        super();
        this.name = word;
    }

    expr() {
        return `${String(this.name)}`
    }
}

module.exports = {
    Node,
    Form,
    String,
    Number,
    Ident,
};

