const rt = `
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
};

const $slash$ = (...nums) => {
    if (nums.length == 1) {
        return 1/nums[0];
    }
    let ret = nums[0];
    for (let i of nums) {
        ret -= i;
    }
    return ret;
};

const do = (...vals) => {
    return vals[vals.length-1];
};
`;

module.exports = rt;
