'use strict';

// Constructor function
// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.year = birthYear;
//   //   console.log(this);
// };

// const person = new Person('abhi', 2002);

// Person.prototype.message = function () {
//   console.log(this.year);
// };

// person.message();
// console.log(Person.prototype);
// console.log(person.__proto__);

// const arr = [];
// console.log(arr.__proto__ === Array.prototype);
// console.dir(arr.__proto__.__proto__);

// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(this.speed);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(this.speed);
// };

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('mercedes', 95);

// bmw.accelerate();
// bmw.accelerate();
// mercedes.brake();
// mercedes.brake();

// es6 class

// class expressions
// const Person = class { }

// class declaration
// class Person {
//   constructor(name, year) {
//     this.firstname = name;
//     this.year = year;
//   }
//   calcAge() {
//     console.log(this.year);
//   }
//   set name(name) {
//     this._name = name;
//   }
//   get name() {
//     return this._name;
//   }
// }

// class Student extends Person {
//   constructor(name, age, course) {
//     // Always needs to happen first
//     super(name, age);
//     this.course = course;
//   }
// }

// const person = new Person('abhi', 2002);
// person.calcAge();
// person.name = 'none';
// console.log(person.name);

// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }
//   get speedUS() {
//     return this.speed / 1.6;
//   }
//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// Inheritance between classes

// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge -= 1;
//   console.log(
//     `${this.make} is going at ${this.speed}, with charge ${this.charge}`
//   );
// };

// const car = new EV('tesla', 120, 23);
// car.chargeBattery(90);
// car.accelerate();

// Object.create()
// const PersonProto = {
//   calcAge() {
//     console.log(this.age);
//   },
//   init(name, age) {
//     this.name = name;
//     this.age = age;
//   },
// };

// const person = Object.create(PersonProto);

// const StudentProto = Object.create(PersonProto);
// StudentProto.init = function (name, age, course) {
//   PersonProto.init.call(this, name, age);
//   this.course = course;
// };

// class Account {
//   // Public
//   locale = 'eng';

//   // private
//   #movements = [];
//   #pin;

//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     this.#pin = pin;
//   }

//   // public methods
//   getMovements() {
//     return this.#movements;
//   }

//   // private methods
//   #approveLoan(val) {
//     return true;
//   }

//   getLoan(val) {
//     console.log(this.#approveLoan(val));
//   }

//   // static method
//   static helper() {
//     console.log('static method');
//   }
// }

// const acc = new Account('a', 1000, 1111);
// console.log(acc.getMovements());
// acc.getLoan(122);
// console.log(acc);
// Account.helper();

// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    return this;
  }
}

class EV extends Car {
  // private
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeTo(charge) {
    this.#charge = charge;
    return this;
  }
}

const car = new EV('honda', 120, 23);
console.log(car.accelerate().chargeTo(50));
