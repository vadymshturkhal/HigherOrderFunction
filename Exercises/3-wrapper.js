'use strict';

const contract = (fn, ...types) => {
  const [firstArg, secondArg, result] = types;

  const inner = f => (...args) => {
    const checkValues = [];

    checkValues.push(firstArg(`${args[0]}`));
    checkValues.push(secondArg(`${args[1]}`));
    const funcResult = f(...args);
    checkValues.push(result(`${funcResult}`));

    args.push(funcResult);

    for (let i = 0; i < 3; i++) {
      const isEqualTypes = checkValues[i] === args[i];
      if (!isEqualTypes) throw new TypeError();
    }
    return funcResult;
  };
  return inner(fn);
};

module.exports = { contract };
