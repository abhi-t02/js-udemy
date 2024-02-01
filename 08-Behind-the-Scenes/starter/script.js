'use strict';

const test = {
  year: 1200,
  func: function () {
    console.log(this);
  },
};

const second = {
  year: 1000,
};

second.func = test.func;

second.func();
