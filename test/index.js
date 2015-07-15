// This test is for node JS

var assert = require('assert');
var a=require("../src/formula_evaluator.js");
describe('Testing Unit', function () {
  it('equal test', function () {
    assert.equal(a.lex("2").toPostfix().postfixEval(),2);
  });
  it('equal test', function () {
    assert.equal(a.lex("sinpi").toPostfix().postfixEval(),0);
  });
  it('equal test', function () {
    assert.equal(a.lex("cos pi").toPostfix().postfixEval(),-1);
  });
  it('equal test', function () {
    assert.equal(a.lex("tan(pi)").toPostfix().postfixEval(),0);
  });
  it('equal test', function () {
    assert.equal(a.lex("2(7-4)3").toPostfix().postfixEval(),18);
  });
  it('equal test', function () {
    assert.equal(a.lex("2").toPostfix().formulaEval(),2);
  });
  it('equal test', function () {
    assert.equal(a.lex("sinpi").toPostfix().formulaEval(),"sin(&pi;)");
  });
  it('equal test', function () {
    assert.equal(a.lex("cos pi").toPostfix().formulaEval(),"cos(&pi;)");
  });
  it('equal test', function () {
    assert.equal(a.lex("tan(pi)").toPostfix().formulaEval(),"tan(&pi;)");
  });
  it('equal test', function () {
    assert.equal(a.lex("2(7-4)3").toPostfix().formulaEval(),"(2&times;(7-4))&times;3");
  });
});