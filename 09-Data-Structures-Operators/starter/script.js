'use strict';

// Data needed for a later exercise

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// console.log(restaurant.openingHours?.mon);
let [first, third] = restaurant.categories;

[first, third] = [third, first];
console.log(first, third);

const arr = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const [i, el] of arr.entries()) console.log(i + 1, ':', el);
// console.log(arr);

// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(sat, weekdays);
// console.log(undefined || 0);
// console.log(23 && null && 'hello');

// Nullish operator: null and undefined. (Not 0 or '')
// let num = 0;
// // const guestNumbers = num ?? 10;
// // console.log(guestNumbers);

// // Logical assignment operators
// let numGuests = 0;

// num ??= 10;
// console.log(num);

/*
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// #2 challenge:
/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

// 1.
// for (const [index, score] of game.scored.entries()) {
//   console.log(`Goal ${index + 1}: ${score}`);
// }

// 2.
// let sum = 0;
// for (const odd of Object.values(game.odds)) {
//   sum += odd;
// }
// console.log(sum / 3);

// 3.
// for (const [index, odd] of Object.entries(game.odds)) {
//   console.log(`Odd of ${game[index] || 'draw'} : ${odd}`);
// }

// 4.
const scorers = {};

for (const score of game.scored) {
  scorers[score] ? scorers[score]++ : (scorers[score] = 1);
}
// console.log(scorers);

// 1.
const [team1, team2] = game.players;
// console.log(team1, team2);

const [gk, ...fieldPlayers] = team1;
// console.log(gk);

const allPlayers = [...team1, ...team2];
// console.log(allPlayers);

// 4. 'Thiago', 'Coutinho' and 'Perisic'
const newTeam1 = [...team1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(newTeam1);

// 5.
const { team1: t1, x, team2: t2 } = game.odds;
// console.log(t1, x, t2);

// 6
// t1 < t2 && console.log('Team1 will win.');

// for of for object literals by using Object values and keys method.
// for (const [key, { open, close }] of Object.entries(restaurant.openingHours)) {
// console.log(`${key} : ${open} , ${close}`);
// }

// console.log(Object.entries(restaurant.openingHours));

// sets - stores unique values
// const orders = new Set(['pasta', 'pizza', 'pizza', 'pasta', 'nothing']);

// console.log(orders.size);
// console.log(orders.has('pizza'));
// orders.add('Garlic bread');
// orders.delete('nothing');
// console.log(orders);

// maps - fundamentals
// const rest = new Map();
// console.log(rest.set('name', 'Italiano'));
// rest.set(true, 'We are open').set(false, 'we are close');

// console.log(rest.get(true));

const question = new Map([
  ['name', 'What is your name?'],
  [1, 'c'],
  [2, 'java'],
  [3, 'js'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try again'],
]);
// console.log(question);

// convert object into map
const hpursMap = new Map(Object.entries(restaurant.openingHours));
// console.log(hpursMap);

// Quiz app
// console.log(question.get('name'));
// for (const [key, value] of question) {
//   typeof key === 'number' && console.log(`${key} : ${value}`);
// }

// let answer = 3;

// console.log(question.get(question.get('correct') === answer));

// Convert map into array
// const testArr = [...question];
// console.log(testArr);

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1.
// const newArr = [...new Set(gameEvents.values())];

// gameEvents.delete(64);

// const str = `An event happened, on average, every ${
//   90 / gameEvents.size
// } minutes`;
// console.log(str);
// console.log(gameEvents.entries());
// for (const [time, event] of gameEvents.entries()) {
//   console.log(
//     ` ${time < 45 ? '[FIRST HALF]' : '[SECOND HALF]'} ${time}: ${event}`
//   );
// }

// console.log([...gameEvents.keys()].pop());

// console.log(gameEvents);

// Strings
const airPlane = 'Tap air';
const plane = 'A320';

// console.log(airPlane.indexOf('r'));
// console.log(airPlane.slice(4));

// console.log(airPlane.slice(0, airPlane.indexOf(' ')));
// console.log(airPlane.slice(airPlane.lastIndexOf(' ') + 1));

// const checkMiddleSeat = seat => {
//   // B and E are middle seats
//   const s = seat.slice(-1);
//   if (s === 'B' || s === 'E') console.log('Ypu got middle seat.');
//   else console.log('You got lucky.');
// };

// checkMiddleSeat('11B');
// checkMiddleSeat('12C');

// console.log(airPlane.toLocaleLowerCase());
// console.log('jonas'.toUpperCase());

// titleCase
const lowerName = plane.toLocaleLowerCase();
const correctName = lowerName[0].toUpperCase() + lowerName.slice(1);
// console.log(correctName);

// Comparing emails
// const email = 'hello@gmail.com';
// const loginEmail = 'Hello@Gmail.COM \n';

// const lowerEmail = loginEmail.toLocaleLowerCase().trim();
// console.log(lowerEmail);

// const priceUS = '288,97$';
// const priceInd = priceUS.replace('$', 'Rs.').replace(',', '.');
// console.log(priceInd);

// Booleans
// console.log(plane.includes('1'));
// console.log(plane.startsWith('A'));

// split
// console.log(airPlane.split());

// const [firstName, lastName] = 'ABhi Trivedi'.split(' ');

// const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
// console.log(newName);

// const capitalizeName = name => {
//   const names = name.split(' ');
//   const namesUpper = [];
//   names.forEach(element => {
//     // namesUpper.push(element[0].toUpperCase() + element.slice(1));
//     namesUpper.push(element.replace(element[0], element[0].toUpperCase()));
//   });
//   console.log(namesUpper.join(' '));
// };

// const passenger = 'jessica abhi sith';
// capitalizeName(passenger);

const message = 'Go to game 201';
// console.log(message.padStart(25, '+'));

// const maskCredit = number => {
//   const str = String(number);
//   const lastFourNumber = str.slice(-4);

//   console.log(lastFourNumber.padStart(str.length, '*'));
// };

// maskCredit(653242131315165);

// repeat
console.log(message.repeat(3));

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const flightArr = flights.split('+');
console.log(flightArr);

let output = '';

flightArr.forEach(flight => {
  const [cause, start, destination, time] = flight.split(';');

  const newCause = cause.replace(/_/g, ' ');
  const newStart = start.slice(0, 3).toUpperCase();
  const newDestination = destination.slice(0, 3).toUpperCase();
  const newTime = time.replace(':', 'h');

  output +=
    `${newCause} from ${newStart} to ${newDestination} (${newTime})`.padStart(
      50,
      ' '
    ) + '\n';
});

console.log(output);
