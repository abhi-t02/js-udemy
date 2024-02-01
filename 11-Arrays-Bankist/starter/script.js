'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
let currentAccount;
let balance;

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Project
const displayMovements = function (movements = [], sort = false) {
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  containerMovements.innerHTML = '';
  movs.forEach((movement, index) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    let str = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${movement}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', str);
  });
};

// Calculate total balance
const calcDisplayBalance = (movements = []) => {
  balance = movements.reduce((acc, value) => acc + value);
  labelBalance.textContent = balance + '€';
};

// Calculate the summary of movements
const calcDisplaySummary = (movements = [], interest = 0) => {
  const balance = movements
    .filter(value => value > 0)
    .reduce((acc, value) => acc + value, 0);
  labelSumIn.textContent = balance + '€';

  const sumOut = movements
    .filter(value => value < 0)
    .reduce((acc, value) => acc + value, 0);
  labelSumOut.textContent = Math.abs(sumOut) + '€';

  const interestRate = movements
    .filter(value => value > 0)
    .map(deposit => (deposit * interest) / 100)
    .filter(int => int > 1)
    .reduce((acc, value) => acc + value);
  labelSumInterest.textContent = interestRate + '€';
};

const createUserName = (accounts = []) => {
  accounts.forEach(account => {
    account.username = account.owner
      .split(' ')
      .map(value => {
        return value[0].toLowerCase();
      })
      .join('');
  });
};
createUserName(accounts);

const updateUI = () => {
  displayMovements(currentAccount.movements);
  calcDisplaySummary(currentAccount.movements, currentAccount.interestRate);
  calcDisplayBalance(currentAccount.movements);
};

// event handlers for login btn

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAccount = accounts.find(
    account => account.username == inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // console.log('login');
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = '1';

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI();
  }
});

// Loan btn
btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some(value => value > amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    updateUI();
  }
  inputLoanAmount.blur();
  inputLoanAmount.value = '';
});

// Transfer money logic
btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // check for balance
  if (
    amount > 0 &&
    recieverAccount &&
    amount < balance &&
    recieverAccount?.username !== currentAccount.username
  ) {
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();
    // console.log(amount, recieverAccount);
    currentAccount.movements.push(Number('-' + amount));
    recieverAccount.movements.push(amount);
    updateUI();
  } else {
  }
});

// closing account btn
btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const position = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(position, 1);
    // console.log(accounts);
    currentAccount = {};
    containerApp.style.opacity = 0;
  }
});

let sort = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sort);
  sort = !sort;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// The filter method
// const deposits = movements.filter(mov => mov > 0);
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(deposits, withdrawals);

// The reduce method
// const balance = movements.reduce((acc, value, i, arr) => {
//   return acc + value;
// }, 0);
// console.log(balance);

// The maximum value
// const maxValue = movements.reduce(
//   (acc, value) => (value > acc ? value : acc),
//   movements[0]
// );
// console.log(maxValue);

/////////////////////////////////////////////////

// const arr = 'abhicdeh'.split();
// movements.forEach((value, index, arr) => {
//   console.log(value, index, arr);
// });

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const checkDogs = (dogsJulia = [], dogsKate = []) => {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);

//   const arr = dogsJuliaCorrected.concat(dogsKate);

//   arr.forEach((dogAge, index) => {
//     console.log(
//       `Dog number ${index + 1} is ${
//         dogAge >= 3 ? 'an Adult' : 'a puppy'
//       }, and is ${dogAge} years old.`
//     );
//   });
//   // console.log(dogsJuliaCorrected);
// };
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = (ages = []) => {
//   const humanAges = ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18);
//   const avgAges =
//     humanAges.reduce((acc, value) => acc + value, 0) / humanAges.length;
//   console.log(humanAges, avgAges);
// };
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

// const obj = {
//   name: 'abhi',
// };

// const anotherObj = { ...obj };
// anotherObj.name = 'another';
// console.log(obj, anotherObj);

// some and every
// console.log(movements.some(value => value > 0));
// console.log(movements.every(value => value > 0));

// flat and flatMap
// const arr = [
//   [1, [2, 3]],
//   [3, 4],
//   [5, [6, [8]]],
// ];

// console.log(arr.flat());

// const overallBalance = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, value) => acc + value);
// console.log(overallBalance);

// sorting arrays
// const newArr = movements.sort((a, b) => b - a);
// console.log(newArr);

const arr = [1, 2, 3, 4, 5];
const arr2 = new Array(7);
// console.log(arr2.fill(1));

const newArr = Array.from({ length: 5 }, (_, k) => k + 1);
// console.log(newArr);

// 100 dice numbers
// const diceArr = Array.from(
//   { length: 100 },
//   (_, k) => Math.trunc(Math.random() * 6) + 1
// );
// console.log(diceArr);

// const { deposits, withdrawal } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, value) => {
//       sums[value > 0 ? 'deposits' : 'withdrawal'] += value;
//       return sums;
//     },
//     { deposits: 0, withdrawal: 0 }
//   );
// console.log(deposits, withdrawal);

// titlecase
// const titlecase = (title = '') => {
//   const exceptions = ['a', 'an', 'the', 'is'];
//   return title
//     .toLowerCase()
//     .split(' ')
//     .map(word =>
//       exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
//     )
//     .join(' ');
// };

// console.log(titlecase('This is the a HIgh.'));

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:


GOOD LUCK 😀
*/

// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];

// const checkFoodPortion = dog =>
//   dog.current > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

// dogs.forEach(dog => {
//   dog.recFood = dog.weight ** 0.75 * 28;
//   dog.owners.includes('Sarah')
//     ? dog.current > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
//       ? null
//       : console.log('Dog is eating fine')
//     : null;
// });

// const owners = dogs.reduce(
//   (owners, dog) => {
//     owners[
//       dog.recFood < dog.curFood ? 'ownersEatTooMuch' : 'ownersEatTooLittle'
//     ].push(...dog.owners);
//     return owners;
//   },
//   {
//     ownersEatTooMuch: [],
//     ownersEatTooLittle: [],
//   }
// );

// console.log(dogs.some(dog => dog.curFood === dog.recFood));

// console.log(owners);

// const sortedArr = [...dogs].sort((a, b) => a.recFood - b.recFood);
// console.log(sortedArr);
