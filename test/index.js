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
  it('formula test', function () {
    assert.equal(a.lex("2").toPostfix().formulaEval(),2);
  });
  it('formula test', function () {
    assert.equal(a.lex("sinpi").toPostfix().formulaEval(),"sin(&pi;)");
  });
  it('formula test', function () {
    assert.equal(a.lex("cos pi").toPostfix().formulaEval(),"cos(&pi;)");
  });
  it('formula test', function () {
    assert.equal(a.lex("tan(pi)").toPostfix().formulaEval(),"tan(&pi;)");
  });
  it('formula test', function () {
    assert.equal(a.lex("2(7-4)3").toPostfix().formulaEval(),"(2&times;(7-4))&times;3");
  });
  it('test to check the bug when number contains decimal', function () {
    assert.equal(a.lex("int2.3").toPostfix().postfixEval(),"2");
  });
  var str="";
	var x=a.lex("sin4!").value;
	for(i=0;i<x.length;i++)
  str+=x[i].show;
  console.log(str);
  var str="";
	var x=a.lex("sin(4)!").value;
	for(i=0;i<x.length;i++)
  str+=x[i].show;
  console.log(str);
  it('test to check auto correct of parenthesis mismatch if opening>closing', function () {
    assert.equal(a.lex("(2+(3-4").toPostfix().postfixEval(),"1");
  });
});