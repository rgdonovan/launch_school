class Trinagle {
  constructor(side1, side2, side3) {
    this.side1 = side1;
    this.side2 = side2;
    this.side3 = side3;
  }

  _validArgs() {
    return (this.side1 > 0 && this.side2 > 0 && this.side3 >0) &&
           ((this.side1 + this.side2 >= this.side3) && 
            (this.side2 + this.side3 >= this.side1) &&
            (this.side3 + this.side1 >= this.side2));
  }
  kind() {
    if (!this._validArgs()) {
      throw new Error('Invalid sides');
    }

    if (this.side1 === this.side2 && this.side2 === this.side3) {
      return 'equilateral';
    } else if (this.side1 === this.side2 || this.side2 === this.side3 || this.side3 === this.side1) {
      return 'isosceles';
    } else {
      return 'scalene';
    }
  }
}

module.exports = Trinagle;