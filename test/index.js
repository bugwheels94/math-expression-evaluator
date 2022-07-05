// This test is for node JS

var assert = require('assert')
var Mexp = require('../src/formula_evaluator.js')

describe('Testing Unit', function () {
	it('should equal 2 to check a number', function () {
		assert.equal(Mexp.lex('2').toPostfix().postfixEval(), 2)
	})
	it('checks a math function', function () {
		assert.equal(Mexp.lex('tan(180)').toPostfix().postfixEval(), 0)
	})
	it('checks a parenthesis less function', function () {
		assert.equal(Mexp.lex('sin180').toPostfix().postfixEval(), 0)
	})
	it('checks a parenthesis less function with multiplication', function () {
		assert.equal(Mexp.lex('0sin180').toPostfix().postfixEval(), 0)
	})
	it('checks a multiplication of root function', function () {
		assert.equal(Mexp.lex('3 root 9').toPostfix().postfixEval(), 9)
	})
	it('checks a multiplication of root function', function () {
		assert.equal(Mexp.lex('3root9').toPostfix().postfixEval(), 9)
	})

	it('checks a parenthesis less function with multiplication by decimal', function () {
		assert.equal(Mexp.lex('0.5sin90').toPostfix().postfixEval(), 0.5)
	})
	it('checks a parenthesis less function after a space', function () {
		assert.equal(Mexp.lex('cos 180').toPostfix().postfixEval(), -1)
	})

	it('checks a parenthesis function with multiplication', function () {
		assert.equal(Mexp.lex('0.5sin(90)').toPostfix().postfixEval(), 0.5)
	})

	it('checks a parenthesis less function after multiple spaces', function () {
		assert.equal(Mexp.lex('cos   180').toPostfix().postfixEval(), -1)
	})
	it('checks consecutive operator', function () {
		assert.equal(Mexp.lex('0+-2').toPostfix().postfixEval(), -2)
	})
	it('checks ^ operator', function () {
		assert.equal(Mexp.lex('2^2').toPostfix().postfixEval(), 4)
	})
	it('checks when * is omitted before parenthesis and after', function () {
		assert.equal(Mexp.lex('2(7-4)3').toPostfix().postfixEval(), 18)
	})
	it('checks multiplication and exponential in series', function () {
		assert.equal(Mexp.lex('2*7^2').toPostfix().postfixEval(), 98)
	})
	it('checks exponential and multiplication in series', function () {
		assert.equal(Mexp.lex('2^5*2').toPostfix().postfixEval(), 64)
	})
	it('-3^2=-9', function () {
		assert.equal(Mexp.lex('-3^2').toPostfix().postfixEval(), -9)
	})
	it('3^2-2^2=5', function () {
		assert.equal(Mexp.lex('3^2-2^2').toPostfix().postfixEval(), 5)

		assert.equal(
			Math.round((Mexp.eval('(4-(2-1)^2)^.5') + Number.EPSILON) * 100) / 100,
			Math.round((Math.sqrt(3) + Number.EPSILON) * 100) / 100
		)
	})

	it('formula test', function () {
		assert.equal(Mexp.lex('2').toPostfix().formulaEval(), 2)
	})
	it('formula test', function () {
		assert.equal(Mexp.lex('sinpi').toPostfix().formulaEval(), 'sin(&pi;)')
	})
	it('formula test', function () {
		assert.equal(Mexp.lex('cos pi').toPostfix().formulaEval(), 'cos(&pi;)')
	})
	it('formula test', function () {
		assert.equal(Mexp.lex('tan(pi)').toPostfix().formulaEval(), 'tan(&pi;)')
	})
	it('formula test', function () {
		assert.equal(Mexp.lex('2(7-4)3').toPostfix().formulaEval(), '(2&times;(7-4))&times;3')
	})
	it('test to check the bug when number contains decimal', function () {
		assert.equal(Mexp.lex('int2.3').toPostfix().postfixEval(), '2')
	})
	it('test to check auto correct of parenthesis mismatch if opening>closing', function () {
		assert.equal(Mexp.lex('(2+(3-4').toPostfix().postfixEval(), '1')
	})
	it('check for negative of a constant', function () {
		assert.equal(Mexp.lex('-e').toPostfix().postfixEval(), -Math.E)
	})
	it('check for constant inside Sigma', function () {
		assert.equal(
			Mexp.lex('Sigma1,3,2', [{ type: 3, value: 'x', show: 'x', token: 'x' }])
				.toPostfix()
				.postfixEval({ x: 2 }),
			6
		)
	})
	it('check when arithmetic and n are present inside sigma', function () {
		assert.equal(Mexp.lex('Sigma1,2,n').toPostfix().postfixEval(), 3)
	})
	it(' should check when 4C3', function () {
		assert.equal(Mexp.lex('4C3').toPostfix().postfixEval(), 4)
	})
	it('check when arithmetic and n are present inside sigma', function () {
		assert.equal(Mexp.lex('Sigma1,2,(n*n)').toPostfix().postfixEval(), 5)
	})

	it('check when two parenthesis less functions are consecutive on one parameter', function () {
		// console.log(a.lex('int(2.6*2)*10').toPostfix().postfixEval())
		assert.equal(Mexp.lex('sinint2').toPostfix().postfixEval(), Mexp.lex('sin(int(2))').toPostfix().postfixEval())
	})

	it('check eval method with single argument', function () {
		assert.equal(Mexp.eval('5*3'), '15')
	})
	it('check eval method with three argument', function () {
		assert.equal(
			Mexp.eval('mexp*3', [{ type: 3, show: 'mexp', token: 'mexp', value: 'mexp', preced: 0 }], {
				mexp: 5,
			}),
			'15'
		)
	})
	it('check eval method with two argument when second one is value of constants', function () {
		Mexp.addToken([{ type: 3, show: 'mexp', value: 'mexp', token: 'mexp' }])
		assert.equal(Mexp.eval('mexp*3', { mexp: 5 }), '15')
	})
	it('check eval method with two argument when second one is value of constants', function () {
		Mexp.addToken([
			{
				type: 0,
				show: 'mexp',
				value: function (a) {
					return 10 * a
				},
				token: 'mexp',
			},
		])
		assert.equal(Mexp.lex('mexp3').toPostfix().postfixEval(), '30')
	})
	it('check eval method with two argument when second one is token list', function () {
		assert.equal(
			Mexp.eval('mexp(3)', [
				{
					type: 0,
					show: 'mexp(',
					value: function (a) {
						return 5 * a
					},
					token: 'mexp',
				},
			]),
			'15'
		)
	})
	it('Pi', function () {
		assert.equal(Mexp.eval('Pi1,5,n'), '120')
	})
	it('tan5(6+3)', function () {
		assert.equal(
			Math.round((Mexp.eval('tan45(6+3)') + Number.EPSILON) * 100) / 100,
			Math.round((9 + Number.EPSILON) * 100) / 100
		)
	})
	it('tan(40+5)', function () {
		assert.equal(Mexp.eval('tan(40+5)'), '1')
	})
	it('checks when a 0 is missing in a decimal number', function () {
		assert.equal(Mexp.eval('5*.8'), '4')
	})
	it('checks root function', function () {
		assert.equal(Mexp.eval('root4'), '2')
		assert.equal(
			Math.round((Mexp.eval('root(4-1^2)') + Number.EPSILON) * 100) / 100,
			Math.round((Math.sqrt(3) + Number.EPSILON) * 100) / 100
		)
		assert.equal(
			Math.round((Mexp.eval('root(4-(2-1)^2)') + Number.EPSILON) * 100) / 100,
			Math.round((Math.sqrt(3) + Number.EPSILON) * 100) / 100
		)
	})
	it('checks + precedence before number insise parenthesis ', function () {
		assert.equal(Mexp.eval('(-2)'), '-2')
	})
	it('checks multiple allowable operator', function () {
		assert.equal(Mexp.eval('2+++-++-+-+3'), '-1')
		assert.equal(Mexp.eval('2*+3'), '6')
	})
})
describe('These expression will check for types of returned result', function () {
	it('should tell to compllete expression', function () {
		assert.equal(typeof Mexp.eval('0'), 'number')
	})
})
describe('These expression will raise error', function () {
	it('should tell to compllete expression', function () {
		try {
			Mexp.eval('2*')
			assert.equal(1, 2)
		} catch (e) {
			assert.equal(e.message, 'complete the expression')
		}
	})
	it('should warn about multiple operators', function () {
		try {
			Mexp.eval('2**3')
			assert.equal(1, 2)
		} catch (e) {
			assert.equal(e.message, '* is not allowed after *')
		}
	})
	it('should warn about multiple operators', function () {
		try {
			Mexp.eval('2*Mod*3')
			assert.equal(1, 2)
		} catch (e) {
			assert.equal(e.message, 'Mod is not allowed after *')
		}
	})
	it('should warn about operator inside parenthesis', function () {
		try {
			Mexp.eval('(+)')
			assert.equal(1, 2)
		} catch (e) {
			assert.equal(e.message, ') is not allowed after +')
		}
	})
	it('should warn about operator inside parenthesis', function () {
		try {
			Mexp.eval('(2+3+)')
			assert.equal(1, 2)
		} catch (e) {
			assert.equal(e.message, ') is not allowed after +')
		}
	})
	it('should warn about using space as operator', function () {
		try {
			console.log(Mexp.eval('1 2'))
			assert.equal(1, 2)
		} catch (e) {
			assert.equal(e.message, 'Unexpected Space')
		}
	})
	it('should warn about using space as operator', function () {
		try {
			console.log(Mexp.eval('1. 2'))
			assert.equal(1, 2)
		} catch (e) {
			assert.equal(e.message, 'Unexpected Space')
		}
	})
})
describe('Check autoclose of parenthesis of parser', function () {
	it('should tell to compllete expression', function () {
		assert.equal(Mexp.eval('((2+3*4'), '14')
	})
})
describe('Ading Token', function () {
	it('should tell to compllete expression', function () {
		Mexp.addToken([
			{
				type: 2,
				token: 'nroot',
				show: 'nroot',
				value: function (a, b) {
					return Math.pow(a, 1 / b)
				},
			},
		])
		assert.equal(Mexp.eval('27nroot3'), 3)
		Mexp.addToken([
			{
				type: 2,
				token: 'nrootlongesttoken',
				show: 'nrootlongesttoken',
				value: function (a, b) {
					return Math.pow(a, 1 / b)
				},
			},
		])
		assert.equal(Mexp.eval('27nrootlongesttoken3'), 3)
		Mexp.addToken([
			{
				type: 2,
				token: 'tokenwithnumber34',
				show: 'tokenwithnumber34',
				value: function (a, b) {
					return a + b
				},
			},
		])
		assert.equal(Mexp.eval('17tokenwithnumber347'), 24)
	})
	it('should evaluate to correct two functions', function () {
		Mexp.addToken([
			{
				type: 0,
				token: 'ceil',
				show: 'ceil',
				value: function (a) {
					const ans = Math.ceil(a)
					return ans
				},
			},
			{
				type: 8,
				token: 'min',
				show: 'min',
				value: function (a, b) {
					return Math.min(a, b)
				},
			},
		])
		// console.log("PAGAL", a.eval("min(4,ceil(0.1*10))"))
		assert.equal(Mexp.eval('min(4,ceil(0.011*100))'), 2)
	})
	it('should also evaluate to correct two functions', function () {
		// console.log("PAGAL", a.eval("min(4,ceil(0.1*10))"))
		assert.equal(Mexp.eval('ceil(min(4, 0.0801*100))'), 4)
	})

	it('should tell to compllete expression', function () {
		Mexp.addToken([
			{
				type: 2,
				token: 'nroot',
				show: 'nroot',
				value: function (a, b) {
					return Math.pow(a, 1 / b)
				},
			},
		])
		assert.equal(Mexp.eval('27nroot3'), 3)
	})
	it('should tell to compllete expression', function () {
		Mexp.addToken([
			{
				type: 2,
				token: 'nrootlongesttoken',
				show: 'nrootlongesttoken',
				value: function (a, b) {
					return Math.pow(a, 1 / b)
				},
			},
		])
		assert.equal(Mexp.eval('27nrootlongesttoken3'), 3)
	})
	it('should tell to compllete expression', function () {
		Mexp.addToken([
			{
				type: 2,
				token: 'tokenwithnumber34',
				show: 'tokenwithnumber34',
				value: function (a, b) {
					return a + b
				},
			},
		])
		assert.equal(Mexp.eval('17tokenwithnumber347'), 24)
	})
	it('maximum of 5 numbers', function () {
		Mexp.addToken([
			{
				type: 8,
				token: 'maxof2',
				show: 'maxof2',
				value: function (a, b, c) {
					return Math.max(a, b)
				},
			},
		])
		assert.equal(Mexp.eval('maxof2(1,maxof2(maxof2(maxof2(maxof2(2,3),5),6),7))'), 7)
	})
	it('maximum of 5 numbers using n arguments', function () {
		Mexp.addToken([
			{
				type: Mexp.tokenTypes.FUNCTION_WITH_N_ARGS,
				token: 'maxof5',
				show: 'maxof5',
				numberOfArguments: 5,
				value: function (a, b, c, d, e) {
					return Math.max.apply(Math, [a, b, c, d, e])
				},
			},
		])
		assert.equal(Mexp.eval('maxof5(7, 12, 23, 33, 2)'), 33)
	})
	it('token with absolute', function () {
		Mexp.addToken([
			{
				type: 0,
				token: 'positive',
				show: 'positive',
				value: function (a) {
					return Math.abs(a)
				},
			},
		])
		assert.equal(Mexp.eval('root(positive(2-6))'), 2)
	})
})
