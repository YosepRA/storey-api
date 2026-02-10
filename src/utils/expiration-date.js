function expirationDate(ms) {
  return function expirationDateFn() {
    return Date.now() + ms;
  };
}

module.exports = expirationDate;
