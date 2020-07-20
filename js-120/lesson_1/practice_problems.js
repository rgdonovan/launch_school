/* eslint-disable max-lines-per-function */
function createInvoice(services = {}) {
  let phoneAmt = services.phone || 3000;
  let internetAmt = services.internet || 5500;

  if (services.phone === 0) phoneAmt = 0;
  if (services.internet === 0) internetAmt = 0;

  return {
    phone: phoneAmt,
    internet: internetAmt,
    payments: [],

    total() {
      return this.phone + this.internet;
    },

    addPayment(payment) {
      this.payments.push(payment);
    },

    addPayments(paymentArr) {
      this.payments.push(...paymentArr);
    },

    amountDue() {
      let paid = this.payments.reduce((acc, val) => {
        return acc + val.total();
      }, 0);

      return this.total() - paid;
    }
  };
}

function createPayment(services = {}) {
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,

    total() {
      return this.amount || (this.phone + this.internet);
    }
  };
}




let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());

function createPet(animal, name) {
  return {
    animal,
    name,

    sleep() {
      console.log('I am sleeping');
    },

    wake() {
      console.log('I am awake');
    }
  };
}

let mouse = createPet('mouse', 'mousey');
console.log(mouse);

let petPrototype = {
  sleep() {
    console.log('I am sleeping');
  },

  wake() {
    console.log('I am awake');
  },

  init(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  },
};

