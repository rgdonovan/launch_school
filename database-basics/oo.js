const process = require('process');
const { Client } = require('pg');

class CLI {
  constructor() {
    this.expenseData = new ExpenseData();
  }

  static HELP = `
  An expense recording system
  
  Commands:
  
  add AMOUNT MEMO [DATE] - record a new expense
  clear - delete all expenses
  list - list all expenses
  delete NUMBER - remove expense with id NUMBER
  search QUERY - list expenses with a matching memo field
  `;

  displayHelp() {
    console.log(CLI.HELP);
  }

  run(args) {
    let command = argv[2];

    if (command === 'list') {
      this.expenseData.listExpenses();

    } else if (command === 'add') {
      let amount = args[3];
      let memo = args[4];

      if (amount && memo) {
        this.expenseData.addExpense(amount, memo);
      } else {
        console.log('You must provide an amount and memo.');
      }

    } else {
      this.displayHelp();
    }
  };
}

class ExpenseData {
  constructor() {
    this.client = new Client();
  }

  logAndExit(err) {
    console.log(err);
    process.exit();
  }

  async addExpense(amount, memo) {
    await client.connect().catch(logAndExit);
    let date = (new Date()).toLocaleDateString();
    let queryString = `INSERT INTO expenses (amount, memo, created_on) VALUES ($1, $2, $3)`
    let queryData = [amount, memo, date];

    await client.query(queryString, queryData).catch(logAndExit);;

    await client.end().catch(logAndExit);;
  }

  async listExpenses() {
    await client.connect().catch(logAndExit);;

    let res = await client.query('SELECT * FROM expenses').catch(logAndExit);;
    res.rows.forEach(row => {
      let columns = [
        `${row.id}`.padStart(3),
        row.created_on.toDateString().padStart(12),
        row.amount.padStart(12),
        row.memo,

      ]

      console.log(columns.join(' | '));
    });

    await client.end().catch(logAndExit);;
  }
}

// something that processes arguments
// within that, something that communicates with db
//    within that, somthing that formats the results.


