/**
 * Script to run after npm install
 *
 * Copy selected files to user's directory
 */

'use strict'

var gentlyCopy = require('gently-copy')

var filesToCopy = ['kit/*']

// Get process.stdin as the standard input object.
var standard_input = process.stdin;

// Set input character encoding.
standard_input.setEncoding('utf-8');

// Prompt user to input data in console.
console.log("Directory to place Highway Kit (relative from current): ");

// When user input data and click enter key.
standard_input.on('data', function (data) {

    var dir = data && data.length > 1 ? data : '.'

    // User's local directory
    var userPath = process.env.INIT_CWD + '/' + dir

    // Moving files to user's local directory
    // gentlyCopy(filesToCopy, userPath)

    console.log("\x1b[32mHighway Kit has been added inside " + process.env.INIT_CWD + "/" + dir + "")
    console.log("\x1b[32mPlease run: npm i -D @dogstudio/highway whatwg-fetch gsap")

    process.exit()
});