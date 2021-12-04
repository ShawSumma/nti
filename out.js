/* Form {
  type: 'main',
  args: [
    Form { type: 'call', args: [Array] },
    Form { type: 'call', args: [Array] }
  ]
} */
/* Form {
  type: 'call',
  args: [ Ident { name: 'print' }, Form { type: 'call', args: [Array] } ]
} */
/* Ident { name: 'print' } */
/* Form {
  type: 'call',
  args: [
    Ident { name: '+' },
    Form { type: 'call', args: [Array] },
    Form { type: 'call', args: [Array] }
  ]
} */
/* Ident { name: '+' } */
/* Form {
  type: 'call',
  args: [ Ident { name: '*' }, Value { value: 1 }, Value { value: 2 } ]
} */
/* Ident { name: '*' } */
/* Value { value: 1 } */
/* Value { value: 2 } */
/* Form {
  type: 'call',
  args: [ Ident { name: '*' }, Value { value: 3 }, Value { value: 4 } ]
} */
/* Ident { name: '*' } */
/* Value { value: 3 } */
/* Value { value: 4 } */
/* Form {
  type: 'call',
  args: [ Ident { name: 'print' }, Form { type: 'call', args: [Array] } ]
} */
/* Ident { name: 'print' } */
/* Form {
  type: 'call',
  args: [
    Ident { name: '+' },
    Value { value: 1 },
    Form { type: 'call', args: [Array] },
    Value { value: 4 }
  ]
} */
/* Ident { name: '+' } */
/* Value { value: 1 } */
/* Form {
  type: 'call',
  args: [ Ident { name: '*' }, Value { value: 2 }, Value { value: 3 } ]
} */
/* Ident { name: '*' } */
/* Value { value: 2 } */
/* Value { value: 3 } */
/* Value { value: 4 } */

const print = (...args) => {
    console.log(...args);
};

const $plus$ = (...nums) => {
    let ret = 0;
    for (let i of nums) {
        ret += i;
    }
    return ret;
};

const $dash$ = (...nums) => {
    if (nums.length == 1) {
        return -nums[0];
    }
    let ret = nums[0];
    for (let i of nums) {
        ret -= i;
    }
    return ret;
};

const $star$ = (...nums) => {
    let ret = 1;
    for (let i of nums) {
        ret *= i;
    }
    return ret;
}

const $slash$ = (...nums) => {
    if (nums.length == 1) {
        return 1/nums[0];
    }
    let ret = nums[0];
    for (let i of nums) {
        ret -= i;
    }
    return ret;
}

let main = (() => {
     print($plus$(1, $star$(2, 3), 4))
     return print($plus$($star$(1, 2), $star$(3, 4)));
})
main();
