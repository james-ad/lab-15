'use strict';

const fs = require('fs');
const faker = require('faker');
const fileChanger = require('./src/file-changer');

/*
To start with, you should find that the app.js file has some existing content. This code will read the contents of the specified file from the command line arguments, and convert the contents of the file into uppercase letters. Instead of converting the content to uppercase, use the module faker to generate a fake “lorem ipsum” sentence and replace the contents of the file with this new sentence.
*/

let file = process.argv.slice(2).shift();
fileChanger.alterFile(file);