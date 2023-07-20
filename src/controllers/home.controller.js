module.exports = {
  test(req, res) {
    res.send('Hello from Storey');
  },
  protected(req, res) {
    res.send('Here is a protected route!');
  },
};
