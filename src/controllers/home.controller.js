module.exports = {
  index(req, res) {
    res.send('Hello from Storey home');
  },
  protected(req, res) {
    res.send('Here is a protected route!');
  },
};
