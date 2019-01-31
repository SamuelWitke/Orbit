/* eslint-disable no-console */
import { green, red, cyan, yellow } from "chalk";
import figures from "figures";

// Need to support Node versions that don't support spreading function arguments

export const log = console.log.bind(console);

export const error = messages => {
  console.error(red(...[figures.cross].concat(messages)));
};

export const info = messages => {
  console.info(cyan(...[figures.info].concat(messages)));
};

export const success = messages => {
  console.log(green(...[figures.tick].concat(messages)));
};

export const warn = messages => {
  console.warn(yellow(...[figures.warning].concat(messages)));
};
