const port = process.env.PORT || 8080;
const host =
  process.env.NODE_ENV === "production"
    ? "reduxchater.herokuapp.com"
    : "localhost";

module.exports = {
  port,
  host,
  uri: `http://${host}:${port}`
};
