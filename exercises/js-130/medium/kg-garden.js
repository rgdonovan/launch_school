const STUDENTS = [
  'Alice', 
  'Bob',
  'Charlie',
  'David',
  'Eve',
  'Fred',
  'Ginny',
  'Harriet',
  'Ileana',
  'Joseph',
  'Kincaid',
  'Larry'
];

const FLOWERS = {
  r: 'radishes',
  c: 'clover',
  g: 'grass',
  v: 'violets'
}

const FIRST_ROW = 0;
const SECOND_ROW = 1;

function studentCups(studentIdx) {
    let firstCup = studentIdx * 2;
    let secondCup = firstCup + 1;
    let flowers = [
      this.rows[FIRST_ROW][firstCup],
      this.rows[FIRST_ROW][secondCup],
      this.rows[SECOND_ROW][firstCup],
      this.rows[SECOND_ROW][secondCup]
    ];

    return flowers.map(flower => FLOWERS[flower.toLowerCase()]);
}

class Garden {
  constructor(diagram, students = STUDENTS) {
    this.rows = diagram.split('\n');
    this.students = students.sort();

    this.students.forEach((student, idx) => {
      this[student.toLowerCase()] = studentCups(idx);
    });
  }
}

let garden = new Garden("VCRRGVRG\nRVGCCGCV", ["Samantha", "Patricia", "Xander", "Roger"]);
console.log(garden);

module.exports = Garden;
