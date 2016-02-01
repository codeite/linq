const _ = require('lodash');

const lq = require('./linq');

const data = function*() {
  //console.log('created 1');
  yield 1;
  //console.log('created 2');
  yield 2;
  //console.log('created 3');
  yield 3;
  //console.log('created 4');
  yield 4;
  //console.log('created 5');
  yield 5;
  //console.log('created 6');
}

console.log('About to eumererate');
console.log('every:',
   new Set(lq(data()).map(x=>x*2).filter(x=>!(x%4)))
);
