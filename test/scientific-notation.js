var assert = require('assert')
var Mexp = require('../dist/es/index.js')
var mexp = new Mexp()

describe('Scientific notation', function () {
    it('should parse 1e-7 correctly', function () {
        assert.equal(mexp.eval('1e-7'), 0.0000001)
    })
    it('should parse 1e+7 correctly', function () {
        assert.equal(mexp.eval('1e+7'), 10000000)
    })
    it('should parse 1e7 correctly', function () {
        assert.equal(mexp.eval('1e7'), 10000000)
    })
    it('should parse 1.5e-2 correctly', function () {
        assert.equal(mexp.eval('1.5e-2'), 0.015)
    })
    it('should parse capital E correctly', function () {
        assert.equal(mexp.eval('1E-7'), 0.0000001)
    })
    it('should parse complex expressions with scientific notation', function () {
        assert.equal(mexp.eval('1e-7*10'), 0.000001)
    })
    it('should parse scientific notation with addition', function () {
        assert.equal(mexp.eval('1e3+500'), 1500)
    })
    it('should parse scientific notation in functions', function () {
        assert.equal(mexp.eval('log(1e2)'), 2)
    })
    it('should handle zero exponent correctly', function () {
        assert.equal(mexp.eval('5e0'), 5)
    })
    it('should still support Euler constant e', function () {
        assert.equal(mexp.eval('e'), Math.E)
    })
    it('should distinguish between Euler constant e and scientific notation', function () {
        assert.equal(mexp.eval('e-1e-1+e'), Math.E - 0.1 + Math.E)
    })
})
