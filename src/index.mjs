"use strict";
class Mexp {
    constructor(parsed) {
        this.value = parsed;
    }
    formulaEval() {
        "use strict";
        let pop1, pop2, pop3;
        let disp = [];
        let arr = this.value;
        for (let i = 0; i < arr.length; i++) {
            switch (arr[i].type) {
                case 1:
                case 3: formula_evaluator
                    disp.push({ value: arr[i].type === 3 ? arr[i].show : arr[i].value, type: 1 });
                    break;
                case 13:
                    disp.push({ value: arr[i].show, type: 1 });
                    break;
                case 0:
                    disp[disp.length - 1] = { value: arr[i].show + (arr[i].show != "-" ? "(" : "") + disp[disp.length - 1].value + (arr[i].show != "-" ? ")" : ""), type: 0 };
                    break;
                case 7:
                    disp[disp.length - 1] = { value: (disp[disp.length - 1].type != 1 ? "(" : "") + disp[disp.length - 1].value + (disp[disp.length - 1].type != 1 ? ")" : "") + arr[i].show, type: 7 };
                    break;
                case 10:
                    pop1 = disp.pop();
                    pop2 = disp.pop();
                    if (arr[i].show === 'P' || arr[i].show === 'C')
                        disp.push({ value: "<sup>" + pop2.value + "</sup>" + arr[i].show + "<sub>" + pop1.value + "</sub>", type: 10 });
                    else
                        disp.push({ value: (pop2.type != 1 ? "(" : "") + pop2.value + (pop2.type != 1 ? ")" : "") + "<sup>" + pop1.value + "</sup>", type: 1 });
                    break;
                case 2:
                case 9:
                    pop1 = disp.pop();
                    pop2 = disp.pop();
                    disp.push({ value: (pop2.type != 1 ? "(" : "") + pop2.value + (pop2.type != 1 ? ")" : "") + arr[i].show + (pop1.type != 1 ? "(" : "") + pop1.value + (pop1.type != 1 ? ")" : ""), type: arr[i].type });
                    break;
                case 12:
                    pop1 = disp.pop();
                    pop2 = disp.pop();
                    pop3 = disp.pop();
                    disp.push({ value: arr[i].show + "(" + pop3.value + "," + pop2.value + "," + pop1.value + ")", type: 12 });
                    break;
            }
        }
        return disp[0].value;
    }
    postfixEval(UserDefined) {
        'use strict';
        UserDefined = UserDefined || {};
        UserDefined.PI = Math.PI;
        UserDefined.E = Math.E;
        let stack = [], pop1, pop2, pop3;
        let arr = this.value;
        let bool = (typeof UserDefined.n !== "undefined");
        for (let i = 0; i < arr.length; i++) {
            switch (arr[i].type) {
                case 1:
                    stack.push({ value: arr[i].value, type: 1 });
                    break;
                case 3:
                    stack.push({ value: UserDefined[arr[i].value], type: 1 });
                    break;
                case 0:
                case 7:
                    if (typeof stack[stack.length - 1].type === "undefined") stack[stack.length - 1].value.push(arr[i]);
                    else stack[stack.length - 1].value = arr[i].value(stack[stack.length - 1].value);
                    break;
                case 8:
                    pop1 = stack.pop();
                    pop2 = stack.pop();
                    stack.push({ type: 1, value: arr[i].value(pop2.value, pop1.value) });
                    break;
                case 10:
                    pop1 = stack.pop();
                    pop2 = stack.pop();
                    if (typeof pop2.type === "undefined") {
                        pop2.value = pop2.concat(pop1);
                        pop2.value.push(arr[i]);
                        stack.push(pop2);
                    } else if (typeof pop1.type === "undefined") {
                        pop1.unshift(pop2);
                        pop1.push(arr[i]);
                        stack.push(pop1);
                    } else {
                        stack.push({ type: 1, value: arr[i].value(pop2.value, pop1.value) });
                    }
                    break;
                case 2:
                case 9:
                    pop1 = stack.pop();
                    pop2 = stack.pop();
                    if (typeof pop2.type === "undefined") {
                        pop2 = pop2.concat(pop1);
                        pop2.push(arr[i]);
                        stack.push(pop2);
                    } else if (typeof pop1.type === "undefined") {
                        pop1.unshift(pop2);
                        pop1.push(arr[i]);
                        stack.push(pop1);
                    } else {
                        stack.push({ type: 1, value: arr[i].value(pop2.value, pop1.value) });
                    }
                    break;
                case 12:
                    pop1 = stack.pop();
                    if (typeof pop1.type !== "undefined") {
                        pop1 = [pop1];
                    }
                    pop2 = stack.pop();
                    pop3 = stack.pop();
                    stack.push({ type: 1, value: arr[i].value(pop3.value, pop2.value, new Mexp(pop1)) });
                    break;
                case 13:
                    if (bool) stack.push({ value: UserDefined[arr[i].value], type: 3 });
                    else stack.push([arr[i]]);
                    break;
            }
        }
        if (stack.length > 1) {
            throw (new Mexp.Exception("Uncaught Syntax error"));
        }
        return stack[0].value > 1000000000000000 ? "Infinity" : parseFloat(stack[0].value.toFixed(15));
    }
    toPostfix() {
        'use strict';
        let post = [], elem, popped, prep, pre, ele;
        let stack = [{ value: "(", type: 4, pre: 0 }];
        let arr = this.value;
        for (let i = 1; i < arr.length; i++) {
            switch (arr[i].type) {
                case 1:
                case 3:
                case 13:
                    if (arr[i].type === 1)
                        arr[i].value = Number(arr[i].value);
                    post.push(arr[i]);
                    break;
                case 4:
                    stack.push(arr[i]);
                    break;
                case 5:
                    while ((popped = stack.pop()).type !== 4) {
                        post.push(popped);
                    }
                    break;
                case 11:
                    while ((popped = stack.pop()).type !== 4) {
                        post.push(popped);
                    }
                    stack.push(popped);
                    break;
                default:
                    elem = arr[i];
                    pre = elem.pre;
                    ele = stack[stack.length - 1];
                    prep = ele.pre;
                    let flag = ele.value == 'Math.pow' && elem.value == 'Math.pow';
                    if (pre > prep)
                        stack.push(elem);
                    else {
                        while (prep >= pre && !flag || flag && pre < prep) {
                            popped = stack.pop();
                            ele = stack[stack.length - 1];
                            post.push(popped);
                            prep = ele.pre;
                            flag = elem.value == 'Math.pow' && ele.value == 'Math.pow';
                        }
                        stack.push(elem);
                    }
                    break;
            }
        }
        return new Mexp(post);
    }
    static Exception(message) {
        this.message = message;
    }
    static addToken(tokens) {
        for (let i = 0; i < tokens.length; i++) {
            let x = tokens[i].token.length;
            let temp = -1;

            // newAr is a specially designed data structure index of 1d array = length of tokens
            newAr[x] = newAr[x] || [];
            for (let y = 0; y < newAr[x].length; y++) {
                if (tokens[i].token === newAr[x][y]) {
                    temp = token.indexOf(newAr[x][y]);
                    break;
                }
            }
            if (temp === -1) {
                token.push(tokens[i].token);
                type.push(tokens[i].type);
                if (newAr.length <= tokens[i].token.length) {
                    newAr[tokens[i].token.length] = [];
                }
                newAr[tokens[i].token.length].push(tokens[i].token);
                eva.push(tokens[i].value);
                show.push(tokens[i].show);
            } else {
                // overwrite
                token[temp] = tokens[i].token;
                type[temp] = tokens[i].type;
                eva[temp] = tokens[i].value;
                show[temp] = tokens[i].show;
            }
        }
    }
    static lex(inp, tokens) {
        'use strict';
        let changeSignObj = {
            value: mexpMath.changeSign,
            type: 0,
            pre: 21,
            show: '-'
        };
        let closingParObj = {
            value: ')',
            show: ')',
            type: 5,
            pre: 0
        };
        let openingParObj = {
            value: '(',
            type: 4,
            pre: 0,
            show: '('
        };
        let str = [openingParObj];

        let ptc = []; // Parenthesis to close at the beginning is after one token
        let inpStr = inp;
        let allowed = type0;
        let bracToClose = 0;
        let asterick = {};
        let prevKey = '';
        let i;
        if (typeof tokens !== 'undefined') {
            Mexp.addToken(tokens);
        }
        let obj = {};
        let nodes = tokenize(inpStr);
        for (i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            if (node.type === 14) {
                if (i > 0 &&
                    i < nodes.length - 1 &&
                    nodes[i + 1].type === 1 &&
                    (nodes[i - 1].type === 1 || nodes[i - 1].type === 6)) { throw new Mexp.Exception('Unexpected Space'); }
                continue;
            }
            let cToken = node.token;
            let cType = node.type;
            let cEv = node.eval;
            let cPre = node.precedence;
            let cShow = node.show;
            let pre = str[str.length - 1];
            for (let j = ptc.length; j--;) {
                // loop over ptc
                if (ptc[j] === 0) {
                    if ([0, 2, 3, 4, 5, 9, 11, 12, 13].indexOf(cType) !== -1) {
                        if (allowed[cType] !== true) {
                            throw new Mexp.Exception(cToken + ' is not allowed after ' + prevKey);
                        }
                        str.push(closingParObj);
                        allowed = type1;
                        asterick = type3Asterick;
                        inc(ptc, -1).pop();
                    }
                } else
                    break;
            }
            if (allowed[cType] !== true) {
                throw new Mexp.Exception(cToken + ' is not allowed after ' + prevKey);
            }
            if (asterick[cType] === true) {
                cType = 2;
                cEv = mexpMath.mul;
                cShow = '&times;';
                cPre = 3;
                i = i - 1;
            }
            obj = {
                value: cEv,
                type: cType,
                pre: cPre,
                show: cShow
            };

            switch (cType) {
                case 0:
                    allowed = type0;
                    asterick = {};
                    inc(ptc, 2).push(2);
                    str.push(obj);
                    str.push(openingParObj);
                    break;
                case 1:
                    if (pre.type === 1) {
                        pre.value += cEv;
                        inc(ptc, 1);
                    } else {
                        str.push(obj);
                    }
                    allowed = type1;
                    asterick = {
                        0: true,
                        3: true,
                        4: true,
                        8: true,
                        12: true,
                        13: true
                    };
                    break;
                case 2:
                    allowed = type0;
                    asterick = {};
                    inc(ptc, 2);
                    str.push(obj);
                    break;
                case 3:
                    // constant
                    str.push(obj);
                    allowed = type1;
                    asterick = type3Asterick;
                    break;
                case 4:
                    inc(ptc, 1);
                    bracToClose++;
                    allowed = type0;
                    asterick = {};
                    str.push(obj);
                    break;
                case 5:
                    if (!bracToClose) {
                        throw new Mexp.Exception('Closing parenthesis are more than opening one, wait What!!!');
                    }
                    bracToClose--;
                    allowed = type1;
                    asterick = type3Asterick;
                    str.push(obj);
                    inc(ptc, 1);
                    break;
                case 6:
                    if (pre.hasDec) {
                        throw new Mexp.Exception('Two decimals are not allowed in one number');
                    }
                    if (pre.type !== 1) {
                        pre = {
                            value: 0,
                            type: 1,
                            pre: 0
                        }; // pre needs to be changed as it will the last value now to be safe in later code
                        str.push(pre);
                        inc(ptc, -1);
                    }
                    allowed = {
                        1: true
                    };
                    inc(ptc, 1);
                    asterick = {};
                    pre.value += cEv;
                    pre.hasDec = true;
                    break;
                case 7:
                    allowed = type1;
                    asterick = type3Asterick;
                    inc(ptc, 1);
                    str.push(obj);
                    break;
                case 8:
                    allowed = type0;
                    asterick = {};
                    inc(ptc, 4).push(4);
                    str.push(obj);
                    str.push(openingParObj);
                    break;
                case 9:
                    if (pre.type === 9) {
                        if (pre.value === mexpMath.add) {
                            pre.value = cEv;
                            pre.show = cShow;
                            inc(ptc, 1);
                        } else if (pre.value === mexpMath.sub && cShow === '-') {
                            pre.value = mexpMath.add;
                            pre.show = '+';
                            inc(ptc, 1);
                        }
                    } else if (pre.type !== 5 &&
                        pre.type !== 7 &&
                        pre.type !== 1 &&
                        pre.type !== 3 &&
                        pre.type !== 13) {
                        // changesign only when negative is found
                        if (cToken === '-') {
                            // do nothing for + token
                            // don't add with the above if statement as that will run the else statement of parent if on Ctoken +
                            allowed = type0;
                            asterick = {};
                            inc(ptc, 2).push(2);
                            str.push(changeSignObj);
                            str.push(openingParObj);
                        }
                    } else {
                        str.push(obj);
                        inc(ptc, 2);
                    }
                    allowed = type0;
                    asterick = {};
                    break;
                case 10:
                    allowed = type0;
                    asterick = {};
                    inc(ptc, 2);
                    str.push(obj);
                    break;
                case 11:
                    allowed = type0;
                    asterick = {};
                    str.push(obj);
                    break;
                case 12:
                    allowed = type0;
                    asterick = {};
                    inc(ptc, 6).push(6);
                    str.push(obj);
                    str.push(openingParObj);
                    break;
                case 13:
                    allowed = type1;
                    asterick = type3Asterick;
                    str.push(obj);
                    break;
            }
            inc(ptc, -1);
            prevKey = cToken;
        }
        for (let j = ptc.length; j--;) {
            // loop over ptc
            if (ptc[j] === 0) {
                str.push(closingParObj);
                inc(ptc, -1).pop();
            } else
                break; // if it is not zero so before ptc also cant be zero
        }
        if (allowed[5] !== true) {
            throw new Mexp.Exception('complete the expression');
        }
        while (bracToClose--) {
            str.push(closingParObj);
        }

        str.push(closingParObj);
        return new Mexp(str);
    }
    static eval(str, tokens, obj) {
        if (typeof tokens === "undefined") return this.lex(str).toPostfix().postfixEval();
        if (typeof obj === "undefined") {
            if (typeof tokens.length !== "undefined") return this.lex(str, tokens).toPostfix().postfixEval();
            return this.lex(str).toPostfix().postfixEval(tokens);
        }
        return this.lex(str, tokens).toPostfix().postfixEval(obj);
    }
}

const mexpMath = {
    acos: x => (180 / Math.PI * Math.acos(x)),
    add: (a, b) => a + b,
    asin: x => (180 / Math.PI * Math.asin(x)),
    atan: x => (180 / Math.PI * Math.atan(x)),
    acosh: x => Math.log(x + Math.sqrt(x * x - 1)),
    asinh: x => Math.log(x + Math.sqrt(x * x + 1)),
    atanh: x => Math.log((1 + x) / (1 - x)),
    sin: x => Math.sin(mexpMath.toRadian(x)),
    sinh: x => (Math.pow(Math.E, x) - Math.pow(Math.E, -1 * x)) / 2,
    sub: (a, b) => a - b,
    tan: x => Math.tan(mexpMath.toRadian(x)),
    tanh: x => Mexp.sinha(x) / Mexp.cosha(x),
    toRadian: x => x * Math.PI / 180,
    changeSign: x => -x,
    cos: x => Math.cos(mexpMath.toRadian(x)),
    cosh: x => (Math.pow(Math.E, x) + Math.pow(Math.E, -1 * x)) / 2,
    div: (a, b) => a / b,
    inverse: x => 1 / x,
    log: i => Math.log(i) / Math.log(10),
    mod: (a, b) => a % b,
    mul: (a, b) => a * b,
    C: (n, r) => {
        let pro = 1
        let other = n - r
        let choice = r
        if (choice < other) {
            choice = other
            other = r
        }
        for (let i = choice + 1; i <= n; i++) {
            pro *= i
        }
        return pro / mexpMath.fact(other)
    },
    fact: n => {
        if (n % 1 !== 0) return 'NaN'
        let pro = 1
        for (let i = 2; i <= n; i++) {
            pro *= i
        }
        return pro
    },
    P: (n, r) => {
        let pro = 1
        for (let i = Math.floor(n) - Math.floor(r) + 1; i <= Math.floor(n); i++) {
            pro *= i
        }
        return pro
    },
    Pi: (low, high, ex) => {
        let pro = 1
        for (let i = low; i <= high; i++) {
            pro *= Number(ex.postfixEval({
                n: i
            }))
        }
        return pro
    },
    pow10x: (e) => {
        let x = 1
        while (e--) {
            x *= 10
        }
        return x
    },
    sigma: (low, high, ex) => {
        let sum = 0
        for (let i = low; i <= high; i++) {
            sum += Number(ex.postfixEval({
                n: i
            }))
        }
        return sum
    }
}

function inc(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] += val
    }
    return arr
}

let token = [
    'sin',
    'cos',
    'tan',
    'pi',
    '(',
    ')',
    'P',
    'C',
    ' ',
    'asin',
    'acos',
    'atan',
    '7',
    '8',
    '9',
    'int',
    'cosh',
    'acosh',
    'ln',
    '^',
    'root',
    '4',
    '5',
    '6',
    '/',
    '!',
    'tanh',
    'atanh',
    'Mod',
    '1',
    '2',
    '3',
    '*',
    'sinh',
    'asinh',
    'e',
    'log',
    '0',
    '.',
    '+',
    '-',
    ',',
    'Sigma',
    'n',
    'Pi',
    'pow'
]

let show = [
    'sin',
    'cos',
    'tan',
    '&pi;',
    '(',
    ')',
    'P',
    'C',
    ' ',
    'asin',
    'acos',
    'atan',
    '7',
    '8',
    '9',
    'Int',
    'cosh',
    'acosh',
    ' ln',
    '^',
    'root',
    '4',
    '5',
    '6',
    '&divide;',
    '!',
    'tanh',
    'atanh',
    ' Mod ',
    '1',
    '2',
    '3',
    '&times;',
    'sinh',
    'asinh',
    'e',
    ' log',
    '0',
    '.',
    '+',
    '-',
    ',',
    '&Sigma;',
    'n',
    '&Pi;',
    'pow'
]

let eva = [
    mexpMath.sin,
    mexpMath.cos,
    mexpMath.tan,
    'PI',
    '(',
    ')',
    mexpMath.P,
    mexpMath.C,
    ' '.anchor,
    mexpMath.asin,
    mexpMath.acos,
    mexpMath.atan,
    '7',
    '8',
    '9',
    Math.floor,
    mexpMath.cosh,
    mexpMath.acosh,
    Math.log,
    Math.pow,
    Math.sqrt,
    '4',
    '5',
    '6',
    mexpMath.div,
    mexpMath.fact,
    mexpMath.tanh,
    mexpMath.atanh,
    mexpMath.mod,
    '1',
    '2',
    '3',
    mexpMath.mul,
    mexpMath.sinh,
    mexpMath.asinh,
    'E',
    mexpMath.log,
    '0',
    '.',
    mexpMath.add,
    mexpMath.sub,
    ',',
    mexpMath.sigma,
    'n',
    mexpMath.Pi,
    Math.pow
]

let preced = {
    0: 11,
    1: 0,
    2: 3,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 11,
    8: 11,
    9: 1,
    10: 10,
    11: 0,
    12: 11,
    13: 0,
    14: -1 // will be filtered after lexer
} // stores precedence by types

let type = [
    0, 0, 0, 3, 4, 5, 10, 10, 14, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 10, 0, 1, 1, 1, 2, 7, 0, 0, 2, 1, 1,
    1, 2, 0, 0, 3, 0, 1, 6, 9, 9, 11, 12, 13, 12, 8
]

/*
0 : function with syntax function_name(Maths_exp)
1 : numbers
2 : binary operators like * / Mod left associate and same precedence
3 : Math constant values like e,pi,Cruncher ans
4 : opening bracket
5 : closing bracket
6 : decimal
7 : function with syntax (Math_exp)function_name
8: function with syntax function_name(Math_exp1,Math_exp2)
9 : binary operator like +,-
10: binary operator like P C or ^
11: ,
12: function with , seperated three parameters and third parameter is a string that will be mexp string
13: letiable of Sigma function
*/

let type0 = {
    0: true,
    1: true,
    3: true,
    4: true,
    6: true,
    8: true,
    9: true,
    12: true,
    13: true,
    14: true
} // type2:true,type4:true,type9:true,type11:true,type21:true,type22

let type1 = {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
    11: true,
    12: true,
    13: true
} // type3:true,type5:true,type7:true,type23

let type3Asterick = {
    0: true,
    1: true,
    3: true,
    4: true,
    6: true,
    8: true,
    12: true,
    13: true
} // type_5:true,type_7:true,type_23

let newAr = [
    [],
    [
        '1',
        '2',
        '3',
        '7',
        '8',
        '9',
        '4',
        '5',
        '6',
        '+',
        '-',
        '*',
        '/',
        '(',
        ')',
        '^',
        '!',
        'P',
        'C',
        'e',
        '0',
        '.',
        ',',
        'n',
        ' '
    ],
    ['pi', 'ln', 'Pi'],
    ['sin', 'cos', 'tan', 'Del', 'int', 'Mod', 'log', 'pow'],
    ['asin', 'acos', 'atan', 'cosh', 'root', 'tanh', 'sinh'],
    ['acosh', 'atanh', 'asinh', 'Sigma']
]

function match(str1, str2, i, x) {
    for (let f = 0; f < x; f++) {
        if (str1[i + f] !== str2[f]) {
            return false
        }
    }
    return true
}

function tokenize(string) {
    let nodes = []
    let length = string.length
    let key, x, y
    for (let i = 0; i < length; i++) {
        if (i < length - 1 && string[i] === ' ' && string[i + 1] === ' ') {
            continue
        }
        key = ''
        for (
            x = string.length - i > newAr.length - 2 ? newAr.length - 1 : string.length - i;
            x > 0;
            x--
        ) {
            if (newAr[x] === undefined) continue
            for (y = 0; y < newAr[x].length; y++) {
                if (match(string, newAr[x][y], i, x)) {
                    key = newAr[x][y]
                    y = newAr[x].length
                    x = 0
                }
            }
        }
        i += key.length - 1
        if (key === '') {
            throw new Mexp.Exception("Can't understand after " + string.slice(i))
        }
        let index = token.indexOf(key)
        nodes.push({
            index: index,
            token: key,
            type: type[index],
            eval: eva[index],
            precedence: preced[type[index]],
            show: show[index]
        })
    }
    return nodes
}

export default Mexp