'use strict';

const emitter = require('./emitter');
const fs = require('fs');
const util = require('util');
const faker = require('faker');
const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);

module.exports = exports = {};

/**
 *
 * @param {json} file
 * @function readPromise
 */
exports.loadFile = async function(file) {
  let path = `${process.cwd()}/${file}`;
  console.log('FILE: ', file);
  console.log('PATH: ', path);
  try {
    let data = await read(file);
    data = JSON.parse(data);
    console.log('DATAT: ',data)
    console.log('Original Promise Data: ', data);
    data = JSON.stringify(data);
    return data;
  } catch (e) {
    console.error(e);
  }
};

exports.alterFile = file => {
  fs.readFile(file, err => {
    if (err) {
      throw err;
    }
    let data = faker.lorem.sentence();
    let text = data.toString().toUpperCase();
    fs.writeFile(file, Buffer.from(text), (err, data) => {
      if (err) {
        throw err;
      }
      console.log(`${file} saved`);
    });
  });
};

let file = process.argv.slice(2).shift();
console.log(file)
exports.loadFile(file);

