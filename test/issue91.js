// This test is for node JS

var assert = require('assert')
var Mexp = require('../dist/es/index.js')
var mexp = new Mexp()
describe('Testing Issue #91', function () {
	it('should work subtracting functions', function () {
		assert.equal(
			mexp.eval('sincos1-sincos1'),
			0
		)
	})})
