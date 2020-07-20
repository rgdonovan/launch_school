class CustomSet {
  constructor(set) {
    this.set = set || [];
  }

  empty() {
    return this.set.length === 0;
  }

  contains(item) {
    return this.set.includes(item);
  }

  add(item) {
    if (!this.contains(item)) {
      this.set.push(item);
    }
    return this;
  }

  subset(otherSet) {
    if ((this.empty() && otherSet.empty()) ||
        (this.empty() && !otherSet.empty()))
        return true;
    
    return this.set.every(item => otherSet.contains(item));
  }

  disjoint(otherSet) {
    if (this.empty() || otherSet.empty()) return true;

    return this.set.every(item => !otherSet.contains(item));
  }

  eql(otherSet) {
    if (otherSet.set.length !== this.set.length) return false;
    return otherSet.subset(this);
  }

  filter(callback) {
    return new CustomSet(this.set.filter(callback));
  }

  intersection(otherSet) {
    return this.filter(item => otherSet.contains(item));
  }

  difference(otherSet) {
    return this.filter(item => !(otherSet.contains(item)))
  }

  union(otherSet) {
    let unionSet = new CustomSet(this.set);
    otherSet.set.forEach(item => unionSet.add(item));
    
    return unionSet;
  }
}

let myset = new CustomSet([]);
console.log(myset.add(3));
console.log(myset)
module.exports = CustomSet;