// This test is for node JS

var assert = require('assert');
var a=require("../src/formula_evaluator.js");
describe('Testing Unit', function () {
  it('equal test', function () {
    assert.equal(a.lex("2").toPostfix().postfixEval(),2);
  });
  it('equal test', function () {
    assert.equal(a.lex("sin180").toPostfix().postfixEval(),0);
  });
  it('equal test', function () {
    assert.equal(a.lex("cos 180").toPostfix().postfixEval(),-1);
  });
  it('equal test', function () {
    assert.equal(a.lex("tan(180)").toPostfix().postfixEval(),0);
  });
  it('minus with exponent test', function () {
    assert.equal(a.lex("0+-2^2").toPostfix().postfixEval(),-4);
  });
  it('equal test', function () {
    assert.equal(a.lex("2(7-4)3").toPostfix().postfixEval(),18);
  });
  it('multiplication and exponential in series', function () {
    assert.equal(a.lex("2*7^2").toPostfix().postfixEval(),98);
  });
  it('exponential and multiplication in series', function () {
    assert.equal(a.lex("2^5*2").toPostfix().postfixEval(),64);
  });
  it('-3^2=-9', function () {
    assert.equal(a.lex("-3^2").toPostfix().postfixEval(),-9);
  });
  it('3^2-2^2=5', function () {
    assert.equal(a.lex("3^2-2^2").toPostfix().postfixEval(),5);
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
  it('test to check auto correct of parenthesis mismatch if opening>closing', function () {
    assert.equal(a.lex("(2+(3-4").toPostfix().postfixEval(),"1");
  });
  it('check for negative of a constant', function () {
    assert.equal(a.lex("-e").toPostfix().postfixEval(),-Math.E);
  });
  it('check for constant inside Sigma', function () {
    assert.equal(a.lex("Sigma1,3,2",[{type:3,preced:0,ev:"x",show:"x",token:"x"}]).toPostfix().postfixEval({x:2}),6);
  });
  it('check when arithmetic and n are present inside sigma', function () {
    assert.equal(a.lex("Sigma1,2,n").toPostfix().postfixEval(),3);
  });
  it('check when arithmetic and n are present inside sigma', function () {
    assert.equal(a.lex("Sigma1,2,(n*n)").toPostfix().postfixEval(),5);
  });

  it('check when two parenthesis less functions are consecutive on one parameter', function () {
    assert.equal(a.lex("sinint2.5").toPostfix().postfixEval(),a.lex("sin(int(2.5))").toPostfix().postfixEval());
  });

  it('check eval method with single argument', function () {
    assert.equal(a.eval("5*3"),"15");
  });
  it('check eval method with three argument', function () {
    assert.equal(a.eval("mexp*3",[{type:3,show:"mexp",token:"mexp",value:"mexp",preced:0}],{mexp:5}),"15");
  });
  it('check eval method with two argument when second one is value of constants', function () {
	a.addToken([{type:3,show:"mexp",value:"mexp",preced:0,token:"mexp"}]);
    assert.equal(a.eval("mexp*3",{mexp:5}),"15");
  });
  it('check eval method with two argument when second one is value of constants', function () {
	a.addToken([{type:0,show:"mexp",value:function(a){return 5*a;},preced:11,token:"mexp"}]);
    assert.equal(a.lex("mexp3").toPostfix().postfixEval(),"15");
  });
  it('check eval method with two argument when second one is token list', function () {
	 assert.equal(a.eval("mexp(3)",[{type:0,show:"mexp(",value:function(a){return 5*a;},preced:11,token:"mexp"}]),"15");
  });
  it('Pi', function () {
	 assert.equal(a.eval("Pi1,5,n"),"120");
  });
  it('tan5(6+3)', function () {
	 assert.equal(a.eval("tan5(6+3)"),"1");
  });
  it('tan(40+5)', function () {
	 assert.equal(a.eval("tan(40+5)"),"1");
  });
});