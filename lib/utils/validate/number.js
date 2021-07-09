"use strict";

exports.__esModule = true;
exports.isNumeric = isNumeric;
exports.isNaN = isNaN;

function isNumeric(val) {
  return /^\d+(\.\d+)?$/.test(val);
}

function isNaN(val) {
  if (Number.isNaN) {
    return Number.isNaN(val);
  }

  return val !== val;
}