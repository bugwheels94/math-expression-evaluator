// This test is for node JS

var assert = require('assert');
var a=require("../src/formula_evaluator.js");
describe('Testing Unit', function () {

  it('2w', function () {
	 assert.equal(a.eval("2w"),"22");
  });
});