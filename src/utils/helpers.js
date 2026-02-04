async function promiseResolver(promise) {
  try {
    const data = await promise;
    return [data, null];
  } catch (err) {
    return [null, err];
  }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function expirationDate(ms) {
  return function expirationDateFn() {
    return Date.now() + ms;
  };
}

function buildArraySetOperation(chunk, body, allowedFields) {
  const setOperation = {};

  allowedFields.forEach((field) => {
    if (body[field]) {
      setOperation[`${chunk}.$.${field}`] = body[field];
    }
  });

  return setOperation;
}

module.exports = {
  promiseResolver,
  numberWithCommas,
  expirationDate,
  buildArraySetOperation,
};
