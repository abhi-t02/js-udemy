'use strict';

const flight = 'LH234';
const jonas = {
  name: 'Jonas nthing',
  passport: 2457812,
};

// const checkIn = ()

const greet = greeting => {
  return name => {
    console.log(`${greeting} ${name}`);
  };
};

// greet('hello')('Abhi');

const AirTime = {
  airline: 'AirTime',
  iataCode: 'AT',
  bookings: [],
  book(flightNum, name) {
    console.log(`${name} booked a seat on ${this.airline}`);
    this.bookings.push({
      flightNum,
      name,
      iatacode: this.iataCode,
    });
  },
};

// AirTime.book(239, 'jonas');

const euroWing = {
  airline: 'euroWing',
  iataCode: 'EU',
  bookings: [],
};

// call method
// AirTime.book.call(euroWing, 120, 'test');

// apply method
// AirTime.book.apply(euroWing, [23, 'moye']);

// bind method
// const bookEW = AirTime.book.bind(euroWing);
// bookEW(24, '....');

// Partial application
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.23, 100));
// const addVAT = addTax.bind(null, 0.23);
// console.log(addVAT(100));
// console.log(addVAT(200));

// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section 😃
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     // let str = '' + this.question + '\n';
//     // for (const s of this.options) {
//     //   str += s + '\n';
//     // }
//     let str = `${this.question} \n ${this.options.join('\n')}`;
//     let input = Number(prompt(str));
//     typeof input === 'number' && input >= 0 && input <= 3
//       ? this.answers[input]++
//       : prompt('Please insert right number');

//     this.displayResults();
//   },
//   displayResults() {
//     let type = prompt('type: ');
//     if (type === 'string') {
//       console.log(`Poll results are ${this.answers.join(', ')}`);
//     } else {
//       console.log(this.answers);
//     }
//   },
// };

// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

//   Immediately invoked function
// (function () {
//   console.log('run once');
// })();

// closures
// const secureBooking = function () {
//   let passengerCount = 0;

//   return function () {
//     passengerCount++;
//     console.log(passengerCount);
//   };
// };

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
    console.log('blue');
  });
  console.log('red');
})();
