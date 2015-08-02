

# Introduction
An extremely efficient, flexible and amazing evaluator with a smart parser for Math expression using Javascript.It has all the basic functions supported with extensive support for new functions, variable etc.
Plus it supports Sigma and Pi notations too. Also, any human readable math expression like `sincostan90` is also readable by this evaluator.

##[Demonstration](http://jsbin.com/qokime/edit?html,output)

#Topics

- [Features](#features)
    - [Supported symbols](#supported-symbols)
	- [Amazing support for Sigma and Pi](#amazing-support-for-sigma-and-pi)
	- [Parenthesis less expressions](#parenthesis-less-expression)
- [Installation](#installation)
    - [Node JS](#node-js)
    - [Browser](#browser)
- [Test](#test)
- [Documentation](http://ankit31894.github.io/math-expression-evaluator/)


# Installation
## Node JS
 **Using npm** 

    npm install math-expression-evaluator

## Browser
 **Using bower**

    bower install math-expression-evaluator
# Features  
##Supported symbols

 **+**   Addition Operator eg. 2+3 results 5  
 **-**   Subtraction Operator eg. 2-3 results -1  
 **/**   Division operator eg 3/2 results 1.5  
 **\***   Multiplication Operator eg. 2\*3 results 6  
 **Mod**   Modulus Operator eg. 3 Mod 2 results 1  
 **(**   Opening Parenthesis  
 **)**   Closing Parenthesis  
 **Sigma**   Summation eg. Sigma(1,100,n) results 5050  
 **Pi**   Product eg. Pi(1,10,n) results 3628800  
 **n**   Variable for Summation or Product  
 **pi**   Math constant pi returns 3.14  
 **e**   Math constant e returns 2.71  
 **C**   Combination operator eg. 4C2 returns 6  
 **P**   Permutation operator eg. 4P2 returns 12  
 **!**   factorial operator eg. 4! returns 24  
 **log**   logarithmic function with base 10 eg. log 1000 returns 3  
 **ln**   natural log function with base e eg. ln 2 returns .3010  
 **pow**   power function with two operator pow(2,3) returns 8  
 **^**   power operator eg. 2^3 returns 8  
 **root**   underroot function root 4 returns 2  
**Trigonometric function**  
 **sin**  
 **cos**  
 **tan**  
 **asin**  
 **acos**  
 **atan**  
 **sinh**  
 **cosh**  
 **tanh**  
 **asinh**  
 **acosh**  
 **atanh**  

##Amazing support for Sigma and Pi  
This is a fantastic feature of this calculator that it is capable of evaluating expressions containing **Sigma and Pi**.  
Passing `Sigma(1,100,n)` will evaluate to 5050 as n is summationed from 1 to 100.
and Pi(1,15,n) will evaluate to 1307674368000 as n is multiplied from 1 to 15 which is equal to 15!

##Parenthesis less expression
If a expression is readable by human then it is readable by this evaluator. There is no need to wrap every function inside parenthesis.
For eg. sin90 will work totally fine instead of sin(90)

# Test  
    npm test