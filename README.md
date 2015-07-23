# Introduction

An extremelyt efficient evaluator with a smart parser for Math expression using Javascript. This evaluator will add some parenthesis if the user misses some. In short, any human readable math expression like `sincostan90` or `Sigma1,Sigma1,2,n,n`( which will give 6 as `Sigma(1 , Sigma(1 , 2 , n) , n) )` ) is also readable by this evaluator

# Installation
## Node JS
 **Using npm** 

    npm install math-expression-evaluator

## Browser
 **Using bower**

    bower install math-expression-evaluator
# Supported Maths Symbols

> **+**   Addition Operator eg. 2+3 results 5

> **-**   Subtraction Operator eg. 2-3 results -1

> **/**   Division operator eg 3/2 results 1.5 

> **\***   Multiplication Operator eg. 2*3 results 6

> **Mod**   Modulus Operator eg. 3 Mod 2 results 1

> **(**   Opening Parenthesis

> **)**   Closing Parenthesis

> **Sigma**   Summation eg. Sigma(1,100,n) results 5050

> **Pi**   Product eg. Pi(1,10,n) results 3628800

> **n**   Variable for Summation or Product

> **pi**   Math constant pi returns 3.14

> **e**   Math constant e returns 2.71

> **C**   Combination operator eg. 4C2 returns 6

> **P**   Permutation operator eg. 4P2 returns 12

> **!**   factorial operator eg. 4! returns 24

> **log**   logarithmic function with base 10 eg. log 1000 returns 3

> **ln**   natural log function with base e eg. ln 2 returns .3010 

> **pow**   power function with two operator pow(2,3) returns 8

> **^**   power operator eg. 2^3 returns 8

> **root**   underroot function root 4 returns 2

**Trigonometric function**

> **sin** 

> **cos**

> **tan**

> **asin**

> **acos**

> **atan**

> **sinh**

> **cosh**

> **tanh**

> **asinh**

> **acosh**

> **atanh**

# Test

    npm test

#[Documentation](http://ankit31894.github.io/math-expression-evaluator/)
