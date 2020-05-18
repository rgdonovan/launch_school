/* eslint-disable max-lines-per-function */
/* item creator
      makes sure all necessary info is:
      present
      valid

      SKU CODE:
        first 3 letters of the item,
        first 2 letters of the category
        if the name consists of 2 words, and the first word consists of 2
        letters only, the next letter is taken from the next word.

      ITEM NAME:
        min 5 chars. Spaces do not count.

      CATEGORY:
        min 5 vhars, only one word.

      QUANTITY:
        Quantity in stock of an item.
        Must not be blank.
        May assume a valid number will be provided.
*/

let ItemCreator = (function() {
  function isValidName(itemName) {
    return itemName.replace(/[' ']/g).length >= 5;
  }

  function isValidCategory(category) {
    return category.length >= 5 && !category.split('').includes(' ');
  }

  function isValidQuantity(quantity) {
    return (typeof quantity === 'number') && quantity >= 0;
  }

  function isValidInput(name, category, quantity) {
    return isValidName(name) &&
      isValidCategory(category) &&
      isValidQuantity(quantity);
  }

  function generateSKU(itemName, category) {
    return ((itemName.replace(/[' ']/g, '').slice(0, 3) +
      category.slice(0, 2))).toUpperCase();
  }

  return function(itemName, category, quantity) {
    if (isValidInput(itemName, category, quantity)) {
      this.skuCode = generateSKU(itemName, category);
      this.itemName = itemName;
      this.category = category;
      this.quantity = quantity;
    } else {
      return { notValid: true };
    }
  };
})();

/* items manager
      creates items
      updates their info
      deletes them
      queries info about them.

      methods:
      create() creates a new item. return FALSE if not successful.

      update() accepts SKU Code and an object as an argument. 
               updates any of the info on an item. Assume valid vals.
      delete() acvepts an SKU Code and deletes the item from the list. 
               may assume valid val is passed.
      items()  returns all the itesm
      inStock() lists all items that have a quantity > 0
      itemsInCategory() lists all the items for a given category.
*/

// you were looking at why delete is deleting the wrong item.
let ItemManager = {
  items: [],

  create(itemName, category, quantity) {
    let newItem = new ItemCreator(itemName, category, quantity);

    if (newItem.notValid) return false;
    this.items.push(newItem);
  },

  getItem(skuCode) {
    let index = this.list().findIndex(obj => {
      return obj.skuCode === skuCode;
    });

    return this.list()[index];
  },

  update(skuCode, object) {
    return Object.assign(this.getItem(skuCode), object);
  },

  delete(skuCode) {
    this.items.splice(this.list().indexOf(this.getItem(skuCode)), 1);
  },

  list() {
    return this.items;
  },

  inStock() {
    return this.items.filter(item => item.quantity > 0);
  },

  itemsInCategory(category) {
    return this.items.filter(item => item.category === category);
  }
};


let ReportManager = (function () {
  return {
    init(itemManager) {
      this.items = itemManager;
      return this;
    },

    createReporter(skuCode) {
      return (function() {
        let item = this.items.getItem(skuCode);
      return {
        itemInfo() {
          Object.keys(item).forEach(key => {
            console.log(`${key}: ${item[key]}`);
          });
        }
      };
    }).bind(this)();
    },

    reportInStock() {
      console.log(this.items.inStock().map(item => item.itemName).join(', '));
    }
  };

})();
ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item
// returns list with the 4 valid items
console.log(ItemManager.items);

ReportManager.init(ItemManager);
// logs soccer ball,football,kitchen pot
ReportManager.reportInStock();

ItemManager.update('SOCSP', { quantity: 0 });
// returns list with the item objects for football and kitchen pot
ItemManager.inStock();
// football,kitchen pot
ReportManager.reportInStock();

// returns list with the item objects for basket ball, soccer ball, and football
ItemManager.itemsInCategory('sports');

ItemManager.delete('SOCSP');
// returns list the remaining 3 valid items (soccer ball is removed from the list)
console.log(ItemManager.items);

let kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10



// /* reports manager
//       generates reports for a specfic item
//       or ALL items

//       methods:
//       init() acepts the ItemManager object as an arg,
//              assigns it to the items property.
//       createReporter() accepts SKU code as an arg, returns an objet:
//           - returned obj has one method, itemInfo(). 
//           Logs all the property of an object as key-value pairs.
//           There's no other properties or methods on the returned object.
//       reportInStock() logs to the console the item names of all the items
//                       that are instock, as comma-separated values.


// */

// /*
// Notice how we create functions that are things:
// ItemCreator, ItemManager etc)

// we create these objects as IIFEs => they're immediately created,
// but they have private state.
// we then instantiate them using Object.create, so that other obejcts
// will delegate to them as their prototypes, saving on memory.
// */

