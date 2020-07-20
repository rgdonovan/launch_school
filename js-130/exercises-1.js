/* eslint-disable max-lines-per-function */
function bind(func, context) {
  return function(...args) {
    func.apply(context, args);
  };
}


let myBind = (func, context, ...outerArgs) => {
  return (...innerArgs) => {
    return func.apply(context, [...outerArgs, ...innerArgs]);
  };
};


function addNumbers(a, b) {
  return a + b;
}

let addFive = myBind(addNumbers, null, 5);

console.log(addFive(15));


function newStack() {
  let stack = [];

  return {
    push(val) {
      stack.push(val);
    },

    pop() {
      stack.pop();
    },

    printStack() {
      stack.forEach(entry => console.log(entry));
    }
  };
}

let myStack = newStack();

myStack.push('hello');
myStack.printStack();
myStack.pop();
myStack.printStack();


function delegate(object, method, ...args) {
  return function() {
    object[method].apply(object, args);
  };
}

class Person {
  constructor(firstName, lastName, age, gender) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  communicate() {
    console.log('blah blah');
  }

  eat() {
    console.log('nom nom');
  }

  sleep() {
    console.log('zzzz');
  }
}

class Doctor extends Person {
  constructor(firstName, lastName, age, gender, specialization) {
    super(firstName, lastName, age, gender);
    this.specialization = specialization;
  }

  diagnose() {
    console.log('its COVID');
  }
}

class Professor extends Person {
  constructor(firstName, lastName, age, gender, subject) {
    super(firstName, lastName, age, gender);
    this.subject = subject;
  }

  teach() {
    console.log(`now teaching ${this.subject}`);
  }
}

let professional = {
  invoice() {
    console.log('invoice');
  },

  payTax() {
    console.log('paying taxes');
  }
};


function delegateTo(mixin, methodName, object) {
  return function(...args) {
    mixin[methodName].apply(object, args);
  };
}

function extend(object, mixin) {
  let mixinKeys = Object.keys(mixin);
  console.log(mixinKeys);

  mixinKeys.forEach(key => {
    object[key] = delegateTo(mixin, key, object);
  });

  console.log(object);

  return object;
}

let doctor = extend(new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics'), professional);
let professor = extend(new Professor('foo', 'bar', 21, 'gender', 'Systems Engineering'), professional);

doctor.invoice();                          // logs 'foo bar is Billing customer'
doctor.payTax();                           // logs 'foo bar Paying taxes'

professional.invoice = function() {
  console.log(this.fullName() + ' is Asking customer to pay');
};

doctor.invoice();                          // logs 'foo bar is Asking customer to pay'
professor.invoice();                       // logs 'foo bar is Asking customer to pay'
professor.payTax();
