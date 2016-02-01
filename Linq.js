'use strict';

module.exports = x=>new Linq(x);

class Linq {

  constructor(iterable) {
    //console.log('it:', it);
    if(iterable[Symbol.iterator]){
      this.iterable = iterable;
      this[Symbol.iterator] = iterable[Symbol.iterator];
    } else {
      throw 'not iterable';
    }
  }

  map(transform) {
    const myIterable={};
    const this_iterable = this.iterable;

    myIterable[Symbol.iterator] = function* () {
      const iterator = this_iterable[Symbol.iterator]();
      let current = iterator.next();

      while(current.done === false) {
        let value = transform(current.value);
        yield value;
        current = iterator.next();
      }
    }
    return new Linq(myIterable);
  }

  filter(predicate) {
    const myIterable={};
    const this_iterable = this.iterable;

    myIterable[Symbol.iterator] = function* () {
      const iterator = this_iterable[Symbol.iterator]();
      let current = iterator.next();

      while(current.done === false) {
        let isMatch = predicate(current.value);
        if(isMatch) {
          yield current.value;
        }
        current = iterator.next();
      }
    }
    return new Linq(myIterable);
  }

  every(predicate) {
    const iterator = this.iterable[Symbol.iterator]();
    let current = iterator.next();

    while(current.done === false) {
      if(!predicate(current.value)) {
        return false;
      }
      current = iterator.next();
    }

    return true;
  }

  includes(predicate) {
    const iterator = this.iterable[Symbol.iterator]();
    let current = iterator.next();

    while(current.done === false) {
      if(predicate(current.value)) {
        return true;
      }
      current = iterator.next();
    }

    return false;
  }

  find(predicate) {
    const iterator = this.iterable[Symbol.iterator]();
    let current = iterator.next();

    while(current.done === false) {
      if(predicate(current.value)) {
        return current.value;
      }
      current = iterator.next();
    }

    return null;
  }

  findLast(predicate) {
    const iterator = this.iterable[Symbol.iterator]();
    let current = iterator.next();
    let match = null;
    while(current.done === false) {
      if(predicate(current.value)) {
        match = current.value;
      }
      current = iterator.next();
    }

    return match;
  }

  // callback(p, c)
  reduce(callback, initialValue) {
    const iterator = this.iterable[Symbol.iterator]();
    let current = iterator.next();
    let value = initialValue;

    if(value === undefined){
      value = current.value;
      current = iterator.next();
    }

    while(current.done === false) {
      value = callback(value, current.value);
      current = iterator.next();
    }

    return value;
  }

  toObject(keyGenerator, valueGenerator) {
    var result = {};

    const iterator = this.iterable[Symbol.iterator]();
    let current = iterator.next();
    while(current.done === false) {
      result[keyGenerator(current.value)] = keyGenerator(current.value);
      current = iterator.next();
    }

    return result;
  }

  toArray() {
    return [...this.iterable];
  }



}
