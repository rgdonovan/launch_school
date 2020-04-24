/* eslint-disable max-lines-per-function */
function makeMultipleLister(num) {
  return function() {
    let count = 1;

    while (num * count < 100) {
      console.log(num * count);
      count++;
    }
  };
}

let lister = makeMultipleLister(17);
lister();
////////////////////////////////////////////////////////////
let total = 0;

function add(num) {
  total += num;
  console.log(total);
}

function subtract(num) {
  total -= num;
  console.log(total);
}

add(1);       // 1
add(42);      // 43
subtract(39); // 4
add(6);       // 10
////////////////////////////////////////////////////////////
function foo(start) {
  let prod = start;
  return function (factor) {
    prod *= factor;
    return prod;
  };
}

let bar = foo(2);
/* function(factor) {
  return 2 *= factor
}
*/
let result = bar(3);

/*
prod = 2 * 3
return 6
result += bar(4);
prod = 6 * 4
24 + 6 = 30
result += bar(5);
prod = 24 * 5
120 + 30 = 150
console.log(result)
*/

////////////////////////////////////////////////////////////
function later(func, argument) {
  return () => func(argument);
}

const logger = message => console.log(message);
let logWarning = later(logger, "The system is shutting down!");
logWarning(); // The system is shutting down!

////////////////////////////////////////////////////////////
function later2(func, argument) {
  return argument2 => func(argument, argument2);
}

const notify = function(message, when) {
  console.log(`${message} in ${when} minutes!`);
};

let shutdownWarning = later2(notify, "The system is shutting down");
shutdownWarning(30); // The system is shutting down in 30 minutes!

////////////////////////////////////////////////////////////
function bind(context, func) {
  return () => func.call(context);
}

let obj = {};
let boundFunc = bind(obj, function() {
  this.foo = "bar";
});

boundFunc();
console.log(obj); // { foo: 'bar' }

////////////////////////////////////////////////////////////
function makeCounterLogger(start) {
  return function(finish) {
    if (start > finish) {
      for (let num = start; num >= finish; num--) {
        console.log(num);
      }
    } else {
      for (let num = start; num <= finish; num++) {
        console.log(num);
      }
    }
  };
}

let countLog = makeCounterLogger(5);
countLog(8);

////////////////////////////////////////////////////////////
function makeList() {
  let items = [];

  return function(newItem) {
    let index;
    if (newItem) {
      index = items.indexOf(newItem);
      if (index === -1) {
        items.push(newItem);
        console.log(`${newItem} added!`);
      } else {
        items.splice(newItem, 1);
        console.log(`${newItem} removed!`);
      }
    } else if (items.length === 0) {
      console.log('the list is empty.');
    } else {
      items.forEach(item => console.log(item));
    }
  };

}

let list = makeList();
list();
list('make breakfast');
list('read book');
list();
list('make breakfast');
list();

function makeList2() {
  return {
    items: [],

    list() {
      if (this.items.length === 0) {
        console.log('The list is empty');
      } else {
        this.items.forEach(item => console.log(item));
      }
    },

    add(item) {
      if (this.items.indexOf(item === -1)) {
        this.items.push(item);
        console.log(`${item} added!`);
      }
    },

    remove(item) {
      if (this.items.indexOf(item) !== -1) {
        this.items.splice(item, 1);
        console.log(`${item} removed!`);
      }
    }
  };
}

function makeList3() {
  let items = [];

  return {
    add(item) {
      if (items.indexOf(item) === -1) {
        items.push(item);
        console.log(item + " added!");
      }
    },

    list() {
      if (items.length === 0) {
        console.log('The list is empty');
      } else {
        items.forEach(item => console.log(item));
      }
    },

    remove(item) {
      let index = items.indexOf(item);
      if (index !== -1) {
        items.splice(index, 1);
        console.log(item + 'removed');
      }
    }
  };
}


let list2 = makeList2();
list2.add('peas');
list2.list();
list2.add('corn');
list2.list();
list2.remove('peas');
list2.list();