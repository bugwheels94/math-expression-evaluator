// This test is for node JS

var assert = require('assert')
var Mexp = require('../dist/es/index.js')
var mexp = new Mexp()
describe('Testing Issue #64', function () {
	it('should check parenthesis less number with exponent', function () {
		assert.equal(mexp.eval('-3^(1+1)'), 9)
	})
})
