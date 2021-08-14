/*
© 2021 Sanha, all rights reserved.
License: CC BY-NC-ND 4.0
*/

function complex () {
  let t = complex._typer(arguments[0])+complex._typer(arguments[1]);
  switch (arguments.length) {
    case 1:   
      if (t == 'nx') {
        this.re = arguments[0], this.im = 0;
      }
      else if (t == 'cx') {
        this.re = arguments[0].re, this.im = arguments[0].im;
      }
      else {
        throw new Error();
      }
    break;
    case 2:
      if (t == 'nn') {
        this.re = arguments[0], this.im = arguments[1];
      }
      else if (t == 'cn') {
        if (arguments[0].im) {
          throw new Error();
        }
        else {
          this.re = arguments[0].re, this.im = arguments[1];
        }
      }
      else if (t == 'nc') {
        if (arguments[1].im) {
          throw new Error();
        }
        else {
          this.re = arguments[0], this.im = arguments[1].re;
        }
      }
      else if (t == 'cc') {
        if (arguments[0].im || arguments[1].im) {
          throw new Error();
        }
        else {
          this.re = arguments[0].re, this.im = arguments[1].re;
        }
      }
      else {
        throw new Error();
      }
    break;
    case 3:      
      if (arguments[2] == 'polar') {
        if (t == 'nn') {
          this.re = arguments[0]*Math.cos(arguments[1]);
          this.im = arguments[0]*Math.sin(arguments[1]);
        }
        else if (t == 'cn') {
          if (arguments[0].im) {
            throw new Error();
          }
          else {
            this.re = arguments[0].re*Math.cos(arguments[1]);
            this.im = arguments[0]*reMath.sin(arguments[1]);
          }
        }
        else if (t == 'nc') {
          if (arguments[1].im) {
            throw new Error();
          }
          else {
            this.re = arguments[0]*Math.cos(arguments[1].re);
            this.im = arguments[0]*Math.sin(arguments[1].re);
          }
        }
        else if (t == 'cc') {
          if (arguments[0].im || arguments[1].im) {
            throw new Error();
          }
          else {
            this.re = arguments[0].re*Math.cos(arguments[1].re);
            this.im = arguments[0].re*Math.sin(arguments[1].re);
          }
        }
        else {
          throw new Error();
        }
      }
      else {
        throw new Error();
      }
    break;
  }
}

complex._typer=c=>(typeof c=='number'||typeof c=='string')&&!Number.isNaN(c)?'n':(c instanceof complex?'c':'x');

Object.defineProperty(complex.prototype, 'abs', {
  get() {
    return Math.hypot(this.re, this.im);
  },
  set(value) {
    let prevAbs = Number(this.abs);
    this.re = this.re*value/prevAbs;
    this.im = this.im*value/prevAbs;
  }
});

Object.defineProperty(complex.prototype, 'arg', {
  get() {
    return Math.atan2(this.im, this.re);
  },
  set(value) {
    let prevAbs = Number(this.abs);
    this.re = Math.cos(value)*prevAbs;
    this.im = Math.sin(value)*prevAbs;
  }
});

complex.prototype.toString = function () {
  return this.re+((Math.sign(this.im)+1)?'+':'')+this.im+'i';
};

complex.prototype.add = function (z) {
  let t = complex._typer(z);
  if (t == 'n') {
    return new complex(this.re + z, this.im);
  }
  else if (t == 'c') {
    return new complex(this.re + z.re, this.im + z.im);
  }
  else {
    throw new Error();
  }
};

complex.prototype.sub = function (z) {
  let t = complex._typer(z);
  if (t == 'n') {
    return new complex(this.re - z, this.im);
  }
  else if (t == 'c') {
    return new complex(this.re - z.re, this.im - z.im);
  }
  else {
    throw new Error();
  }
};

complex.prototype.mul = function (z) {
  let t = complex._typer(z);
  if (t == 'n') {
    return new complex(this.re * z, this.im * z);
  }
  else if (t == 'c') {
    return new complex(this.re*z.re - this.im*z.im, this.re*z.im + this.im*z.re);
  }
  else {
    throw new Error();
  }
};

complex.prototype.div = function (z) {
  let t = complex._typer(z);
  if (t == 'n') {
    return new complex(this.re / z, this.im / z);
  }
  else if (t == 'c') {
    let deno = Math.pow(z.abs, 2);
    return new complex((this.re*z.re + this.im*z.im)/deno, (-this.re*z.im + this.im*z.re)/deno);
  }
  else {
    throw new Error();
  }
};

complex.prototype.inv = function (z) {
  let t = complex._typer(z);
  if (t == 'n') {
    if (Number.isInteger(z)) {
      let tmp = new complex(1);
      let copy = new complex(this.re, this.im);
      if (z >= 0) {
        for (let i = 0; i < z; i++) {
          tmp = tmp.mul(copy);
        }
      }
      else {
        for (let i = 0; i > z; i--) {
          tmp = tmp.div(copy);
        }
      }
      return tmp;
    }
    else {
      return new complex(Math.pow(this.abs, z), this.arg * z, 'polar');
    }
  }
  else if (t == 'c') {
    let abs = Math.pow(this.abs, z.re) * Math.exp(-z.im*this.arg);
    let arg = z.re*this.arg + z.im*Math.log(this.abs);
    return new complex(abs, arg, 'polar');
  }
  else {
    throw new Error();
  }
};

function cxmath () {
  
}

cxmath.conj = function (z) {
  let t = complex._typer(z);
  if (t == 'x') {
    throw new Error();
  }
  let tmp = new complex(z);
  return tmp.sub(new complex(0, 2*tmp.im));
};

cxmath.opp = function (z) {
  let t = complex._typer(z);
  if (t == 'x') {
    throw new Error();
  }
  let tmp = new complex(z);
  return tmp.sub(new complex(2*tmp.re, 2*tmp.im));
};

cxmath.sqrt = function (z) {
  let t = complex._typer(z);
  if (t == 'x') {
    throw new Error();
  }
  return new complex(z).inv(1/2);
};

cxmath.cbrt = function (z) {
  let t = complex._typer(z);
  if (t == 'x') {
    throw new Error();
  }
  return new complex(z).inv(1/3);
};

cxmath.exp = function (z) {
  let t = complex._typer(z);
  if (t == 'x') {
    throw new Error();
  }
  return new complex(Math.E).inv(z);
};

cxmath.ln = function (z) {
  let t = complex._typer(z);
  if (t == 'x') {
    throw new Error();
  }
  let s = new complex(z);
  return new complex(Math.log(s.abs), s.arg);
};

cxmath.log = function (b, a) {
  let t = complex._typer(a) + complex._typer(b);
  if (t.includes('x')) {
    throw new Error();
  }
  return cxmath.ln(a).div(cxmath.ln(b));
};

cxmath.sin = function (z) {
  let t = complex._typer(z);
  if (t.includes('x')) {
    throw new Error();
  }
  let s = new complex(z);
  let i = new complex(0, 1);
  return cxmath.exp(s.mul(i)).sub(cxmath.exp(cxmath.opp(s).mul(i))).div(i.mul(2));
};

cxmath.cos = function (z) {
  let t = complex._typer(z);
  if (t.includes('x')) {
    throw new Error();
  }
  let s = new complex(z);
  let i = new complex(0, 1);
  return cxmath.exp(s.mul(i)).add(cxmath.exp(cxmath.opp(s).mul(i))).div(2);
};

cxmath.tan = function (z) {
  let t = complex._typer(z);
  if (t.includes('x')) {
    throw new Error();
  }
  return cxmath.sin(z).div(cxmath.cos(z));
};

cxmath.asin = function (z) {
  let t = complex._typer(z);
  if (t.includes('x')) {
    throw new Error();
  }
  let s = new complex(z);
  let i = new complex(0, 1);
  return cxmath.ln(i.mul(s).add(cxmath.sqrt(cxmath.opp(s.inv(2).sub(1))))).mul(cxmath.conj(i));
};

cxmath.acos = function (z) {
  let t = complex._typer(z);
  if (t.includes('x')) {
    throw new Error();
  }
  let PI = new complex(Math.PI);
  return PI.sub(cxmath.asin(z)).sub(2);
};

cxmath.atan = function (z) {
  let t = complex._typer(z);
  if (t.includes('x')) {
    throw new Error();
  }
  let s = new complex(z);
  let i = new complex(0, 1);
  return i.div(2).mul(cxmath.ln(i.add(s).div(i.sub(s))));
};

cxmath.atan2 = function (w, z) {
  let t = complex._typer(w)+complex._typer(z);
  if (t.includes('x')) {
    throw new Error();
  }
  return cxmath.atan(new complex(w).div(new complex(z)));
}

cxmath.sinh = function (z) {
  let t = complex._typer(z);
  if (t.includes('x')) {
    throw new Error();
  }
  return cxmath.exp(z).sub(cxmath.exp(cxmath.opp(z))).div(2);
};

cxmath.cosh = function (z) {
  let t = complex._typer(z);
  if (t.includes('x')) {
    throw new Error();
  }
  return cxmath.exp(z).add(cxmath.exp(cxmath.opp(z))).div(2);
};

cxmath.tanh = function (z) {
  let t = complex._typer(z);
  if (t.includes('x')) {
    throw new Error();
  }
  return cxmath.sinh(z).div(cxmath.cosh(z));
};

cxmath.asinh = function (z) {
  let t = complex._typer(z);
  if (t.includes('x')) {
    throw new Error();
  }
  let s = new complex(z);
  return cxmath.ln(s.add(cxmath.sqrt(s.inv(2).add(1))));
};

cxmath.acosh = function (z) {
  let t = complex._typer(z);
  if (t.includes('x')) {
    throw new Error();
  }
  let s = new complex(z);
  return cxmath.ln(s.add(cxmath.sqrt(s.inv(2).sub(1))));
};

cxmath.atanh = function (z) {
  let t = complex._typer(z);
  if (t.includes('x')) {
    throw new Error();
  }
  let one = new complex(1, 0);
  return cxmath.ln(one.add(z).div(one.sub(z))).div(2);
};

cxmath.csgn = function (z) {
  let t = complex._typer(z);
  if (t == 'n') {
    return new complex(Math.sign(z));
  }
  else if (t == 'c') {
    if (z.re) {
      return new complex(Math.sign(z.re));
    }
    else {
      return new complex(Math.sign(z.im));
    }
  }
  else throw new Error();  
};

cxmath.random = function () {
  return new complex(Math.random(), Math.random());
};

module.exports = {
  Complex: complex,
  Cxmath: cxmath
};