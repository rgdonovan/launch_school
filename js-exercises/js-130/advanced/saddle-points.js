class Matrix {
  constructor(diagram) {
    this.diagram = diagram;
    this.rows = this.getRows(diagram);
    this.columns = this.getColumns();
    this.saddlePoints = this.getSaddlePoints();
  }

  getRows() {
    let stringRows = this.diagram.split('\n');
    let stringToNumbers = stringRow => stringRow.trim().split(' ').map(digit => +digit);
    return stringRows.map(stringToNumbers);
  }

  getColumns() {
    let firstRow = this.rows[0];
    const getColumnByIndex = columnIndex => this.rows.map(row => row[columnIndex]);
    return this.rows[0].map((_, columnIdx) => getColumnByIndex(columnIdx));
  }

  getSaddlePoints() {
    let saddlePoints = [];

    for (let rowIdx = 0; rowIdx < this.rows.length; rowIdx++) {
      let row = this.rows[rowIdx];
      for (let columnIdx = 0; columnIdx < this.columns.length; columnIdx++) {
        let currentElement = [rowIdx, columnIdx];
        let maxRow = Math.max(...this.rows[rowIdx]);
        let minColumn = Math.min(...this.columns[columnIdx]);

        if (maxRow === minColumn) {
          saddlePoints.push(currentElement);
        }
      }
    }
    return saddlePoints;
  }
}

let matrix = new Matrix("18 3 39 19 91\n38 10 8 77 320\n3 4 8 6 7");
console.log(matrix);

/*
18 3 39 19 91
38 10 8 77 320
3  4  8 6  7
*/

module.exports = Matrix;
