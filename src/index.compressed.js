function complex(){var e=complex._typer(arguments[0])+complex._typer(arguments[1]);switch(arguments.length){case 1:if("nx"==e)this.re=arguments[0],this.im=0;else{if("cx"!=e)throw new Error;this.re=arguments[0].re,this.im=arguments[0].im}break;case 2:if("nn"==e)this.re=arguments[0],this.im=arguments[1];else if("cn"==e){if(arguments[0].im)throw new Error;this.re=arguments[0].re,this.im=arguments[1]}else if("nc"==e){if(arguments[1].im)throw new Error;this.re=arguments[0],this.im=arguments[1].re}else{if("cc"!=e)throw new Error;if(arguments[0].im||arguments[1].im)throw new Error;this.re=arguments[0].re,this.im=arguments[1].re}break;case 3:if("polar"!=arguments[2])throw new Error;if("nn"==e)this.re=arguments[0]*Math.cos(arguments[1]),this.im=arguments[0]*Math.sin(arguments[1]);else if("cn"==e){if(arguments[0].im)throw new Error;this.re=arguments[0].re*Math.cos(arguments[1]),this.im=arguments[0]*reMath.sin(arguments[1])}else if("nc"==e){if(arguments[1].im)throw new Error;this.re=arguments[0]*Math.cos(arguments[1].re),this.im=arguments[0]*Math.sin(arguments[1].re)}else{if("cc"!=e)throw new Error;if(arguments[0].im||arguments[1].im)throw new Error;this.re=arguments[0].re*Math.cos(arguments[1].re),this.im=arguments[0].re*Math.sin(arguments[1].re)}}}function cxmath(){}complex._typer=e=>"number"!=typeof e&&"string"!=typeof e||Number.isNaN(e)?e instanceof complex?"c":"x":"n",Object.defineProperty(complex.prototype,"abs",{get:function(){return Math.hypot(this.re,this.im)},set:function(e){var r=Number(this.abs);this.re=this.re*e/r,this.im=this.im*e/r}}),Object.defineProperty(complex.prototype,"arg",{get:function(){return Math.atan2(this.im,this.re)},set:function(e){var r=Number(this.abs);this.re=Math.cos(e)*r,this.im=Math.sin(e)*r}}),complex.prototype.toString=function(){return this.re+(Math.sign(this.im)+1?"+":"")+this.im+"i"},complex.prototype.add=function(e){var r=complex._typer(e);if("n"==r)return new complex(this.re+e,this.im);if("c"==r)return new complex(this.re+e.re,this.im+e.im);throw new Error},complex.prototype.sub=function(e){var r=complex._typer(e);if("n"==r)return new complex(this.re-e,this.im);if("c"==r)return new complex(this.re-e.re,this.im-e.im);throw new Error},complex.prototype.mul=function(e){var r=complex._typer(e);if("n"==r)return new complex(this.re*e,this.im*e);if("c"==r)return new complex(this.re*e.re-this.im*e.im,this.re*e.im+this.im*e.re);throw new Error},complex.prototype.div=function(e){var r=complex._typer(e);if("n"==r)return new complex(this.re/e,this.im/e);if("c"!=r)throw new Error;r=Math.pow(e.abs,2);return new complex((this.re*e.re+this.im*e.im)/r,(-this.re*e.im+this.im*e.re)/r)},complex.prototype.inv=function(t){var e=complex._typer(t);if("n"==e){if(Number.isInteger(t)){let r=new complex(1);var n=new complex(this.re,this.im);if(0<=t)for(let e=0;e<t;e++)r=r.mul(n);else for(let e=0;e>t;e--)r=r.div(n);return r}return new complex(Math.pow(this.abs,t),this.arg*t,"polar")}if("c"!=e)throw new Error;return new complex(Math.pow(this.abs,t.re)*Math.exp(-t.im*this.arg),t.re*this.arg+t.im*Math.log(this.abs),"polar")},cxmath.conj=function(e){if("x"==complex._typer(e))throw new Error;let r=new complex(e);return r.sub(new complex(0,2*r.im))},cxmath.opp=function(e){if("x"==complex._typer(e))throw new Error;let r=new complex(e);return r.sub(new complex(2*r.re,2*r.im))},cxmath.sqrt=function(e){if("x"==complex._typer(e))throw new Error;return new complex(e).inv(.5)},cxmath.cbrt=function(e){if("x"==complex._typer(e))throw new Error;return new complex(e).inv(1/3)},cxmath.exp=function(e){if("x"==complex._typer(e))throw new Error;return new complex(Math.E).inv(e)},cxmath.log=function(r,t){if(t){let e=complex._typer(r)+complex._typer(t);if(e.includes("x"))throw new Error;var n=new complex(r),t=new complex(t);return new complex(Math.log(n.abs),n.arg).div(new complex(Math.log(t.abs),t.arg))}r=new complex(r);return new complex(Math.log(r.abs),r.arg)},cxmath.sin=function(e){if("x"==complex._typer(e))throw new Error;let r=new complex(e),t=new complex(0,1);return cxmath.exp(r.mul(t)).sub(cxmath.exp(cxmath.opp(r).mul(t))).div(t.mul(2))},cxmath.cos=function(e){let r=complex._typer(e);if(r.includes("x"))throw new Error;let t=new complex(e);e=new complex(0,1);return cxmath.exp(t.mul(e)).add(cxmath.exp(cxmath.opp(t).mul(e))).div(2)},cxmath.tan=function(e){let r=complex._typer(e);if(r.includes("x"))throw new Error;return cxmath.sin(e).div(cxmath.cos(e))},cxmath.asin=function(e){let r=complex._typer(e);if(r.includes("x"))throw new Error;let t=new complex(e),n=new complex(0,1);return cxmath.ln(n.mul(t).add(cxmath.sqrt(cxmath.opp(t.inv(2).sub(1))))).mul(cxmath.conj(n))},cxmath.acos=function(e){let r=complex._typer(e);if(r.includes("x"))throw new Error;let t=new complex(Math.PI);return t.sub(cxmath.asin(e)).sub(2)},cxmath.atan=function(e){let r=complex._typer(e);if(r.includes("x"))throw new Error;e=new complex(e);let t=new complex(0,1);return t.div(2).mul(cxmath.ln(t.add(e).div(t.sub(e))))},cxmath.atan2=function(e,r){let t=complex._typer(e)+complex._typer(r);if(t.includes("x"))throw new Error;return cxmath.atan(new complex(e).div(new complex(r)))},cxmath.sinh=function(e){let r=complex._typer(e);if(r.includes("x"))throw new Error;return cxmath.exp(e).sub(cxmath.exp(cxmath.opp(e))).div(2)},cxmath.cosh=function(e){let r=complex._typer(e);if(r.includes("x"))throw new Error;return cxmath.exp(e).add(cxmath.exp(cxmath.opp(e))).div(2)},cxmath.tanh=function(e){let r=complex._typer(e);if(r.includes("x"))throw new Error;return cxmath.sinh(e).div(cxmath.cosh(e))},cxmath.asinh=function(e){let r=complex._typer(e);if(r.includes("x"))throw new Error;let t=new complex(e);return cxmath.ln(t.add(cxmath.sqrt(t.inv(2).add(1))))},cxmath.acosh=function(e){let r=complex._typer(e);if(r.includes("x"))throw new Error;let t=new complex(e);return cxmath.ln(t.add(cxmath.sqrt(t.inv(2).sub(1))))},cxmath.atanh=function(e){let r=complex._typer(e);if(r.includes("x"))throw new Error;let t=new complex(1,0);return cxmath.ln(t.add(e).div(t.sub(e))).div(2)},cxmath.csgn=function(e){var r=complex._typer(e);if("n"==r)return new complex(Math.sign(e));if("c"==r)return e.re?new complex(Math.sign(e.re)):new complex(Math.sign(e.im));throw new Error},cxmath.am=function(){let e=Array.from(arguments),r=e.map(e=>complex._typer(e));if(r.includes("x"))throw new Error;return e.map(e=>new complex(e)).reduce((e,r)=>e.add(r)).div(e.length)},cxmath.gm=function(){let e=Array.from(arguments),r=e.map(e=>complex._typer(e));if(r.includes("x"))throw new Error;return e.map(e=>new complex(e)).reduce((e,r)=>e.mul(r)).inv(1/e.length)},cxmath.dist=function(e,r){let t=complex._typer(e)+complex._typer(r);if(t.includes("x"))throw new Error;e=new complex(e),r=new complex(r);return new complex(Math.hypot(e.re-r.re,e.im-r.im))},cxmath.random=function(){return new complex(Math.random(),Math.random())},module.exports={Complex:complex,Cxmath:cxmath};
