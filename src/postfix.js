
    var Mexp=require('./lexer.js');
	// Production steps of ECMA-262, Edition 5, 15.4.4.14
	// Reference: http://es5.github.io/#x15.4.4.14
	if (!Array.prototype.indexOf) {
	  Array.prototype.indexOf = function(searchElement, fromIndex) {

	    var k;

	    // 1. Let o be the result of calling ToObject passing
	    //    the this value as the argument.
	    if (this == null) {
	      throw new TypeError('"this" is null or not defined');
	    }

	    var o = Object(this);

	    // 2. Let lenValue be the result of calling the Get
	    //    internal method of o with the argument "length".
	    // 3. Let len be ToUint32(lenValue).
	    var len = o.length >>> 0;

	    // 4. If len is 0, return -1.
	    if (len === 0) {
	      return -1;
	    }

	    // 5. If argument fromIndex was passed let n be
	    //    ToInteger(fromIndex); else let n be 0.
	    var n = +fromIndex || 0;

	    if (Math.abs(n) === Infinity) {
	      n = 0;
	    }

	    // 6. If n >= len, return -1.
	    if (n >= len) {
	      return -1;
	    }

	    // 7. If n >= 0, then Let k be n.
	    // 8. Else, n<0, Let k be len - abs(n).
	    //    If k is less than 0, then let k be 0.
	    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

	    // 9. Repeat, while k < len
	    while (k < len) {
	      // a. Let Pk be ToString(k).
	      //   This is implicit for LHS operands of the in operator
	      // b. Let kPresent be the result of calling the
	      //    HasProperty internal method of o with argument Pk.
	      //   This step can be combined with c
	      // c. If kPresent is true, then
	      //    i.  Let elementK be the result of calling the Get
	      //        internal method of o with the argument ToString(k).
	      //   ii.  Let same be the result of applying the
	      //        Strict Equality Comparison Algorithm to
	      //        searchElement and elementK.
	      //  iii.  If same is true, return k.
	      if (k in o && o[k] === searchElement) {
	        return k;
	      }
	      k++;
	    }
	    return -1;
	  };
	}

	Mexp.prototype.toPostfix = function () {
		'use strict';
		var post=[],elem,popped,prep,pre,ele;
    	var stack=[{value:"(",type:4,pre:0}];
		var arr=this.value;
		for (var i=1; i < arr.length; i++) {
			if(arr[i].type===1||arr[i].type===3||arr[i].type===13){	//if token is number,constant,or n(which is also a special constant in our case)
				if(arr[i].type===1)
					arr[i].value=Number(arr[i].value);
				post.push(arr[i]);
			}
			else if(arr[i].type===4){
				stack.push(arr[i]);
			}
			else if(arr[i].type===5){
				while((popped=stack.pop()).type!==4){
					post.push(popped);
				}
			}
			else if(arr[i].type===11){
				while((popped=stack.pop()).type!==4){
					post.push(popped);
				}
				stack.push(popped);
			}
			else {
				elem=arr[i];
				pre=elem.pre;
				ele=stack[stack.length-1];
				prep=ele.pre;
				var flag=ele.value=='Math.pow'&&elem.value=='Math.pow';
				if(pre>prep)stack.push(elem);
				else {
					while(prep>=pre&&!flag||flag&&pre<prep){
						popped=stack.pop();
						ele=stack[stack.length-1];
						post.push(popped);
						prep=ele.pre;
						flag=elem.value=='Math.pow'&&ele.value=='Math.pow';
					}
					stack.push(elem);
				}
			}
		}
		return new Mexp(post);
	};
    module.exports=Mexp;