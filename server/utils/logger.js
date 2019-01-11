/* eslint-disable no-console */
import { green, red, cyan, yellow } from "chalk";
import figures from "figures";

// Need to support Node versions that don't support spreading function arguments
const spread = fn =>
  function() {
    return fn([].slice.call(arguments));
  };

export const log = console.log.bind(console);

export const error = spread(messages => {
  console.error(red(...[figures.cross].concat(messages)));
});

export const info = spread(messages => {
  console.info(cyan(...[figures.info].concat(messages)));
});

export const success = spread(messages => {
  console.log(green(...[figures.tick].concat(messages)));
});

export const warn = spread(messages => {
  console.warn(yellow(...[figures.warning].concat(messages)));
});
