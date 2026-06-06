# pbottleRPA.utils Toolbox

Provides basic common utility tools.

Usage:
pbottleRPA.utils.xxx()

Demo example:
Common Tools Utils Demo.js

## getTime Get Formatted Time

utils.getTime()


Formatted time: getTime('Y-m-d H:i:s') outputs a datetime string like "2023-09-17 14:30:45".

@param {string} format format reference: https://www.php.net/manual/en/function.date.php  only supports Y|y|m|d|H|i|s|n|j

@param {number} timestamp timestamp in seconds

@returns {string}

## uniqid Unique ID

utils.uniqid()

Generate a unique string. Note: default is millisecond-level precision.

@param {string} prefix prefix

@param {boolean} moreEntropy whether to enable finer randomness, use uuid if this is not sufficient

@returns {string}


## isNumeric Check Numeric

utils.isNumeric()


Check if a value is numeric (including numeric strings).

@param {*} value any type variable

@returns {boolean}

## hasData Check Data

utils.hasData()

Check if a variable has data, usable directly in if().
Non-zero numbers or non-empty strings, arrays, objects return true, everything else returns false.

@param {*} value any type variable

@returns {boolean}

## searchFile Search Files

utils.searchFile()

Search and locate specific files by keyword.

@param {string} directory absolute path

@param {string} words keywords to match in filename, filter term, case-insensitive by default

@returns {string[]} file paths || [] if not found
