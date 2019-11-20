'use strict';

const emitter = require('./emitter');
const fs = require('fs');
const util = require('util');
const faker = require('faker');
const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);

module.exports = exports = {};

emitter.on('file-saved', (file, error) => {
  console.log(`${file} saved`);
  return {
    status: 1,
    file: file,
    text: error
  };
});

emitter.on('fileError', file => {
  console.log(`file error`);
  return {
    status: 0,
    file: file,
    text: 'saved'
  };
});

/**
 *
 * @param {json} file
 * @function readPromise
 */
exports.loadFile = async function(file) {
  try {
    return await read(file);
  } catch (e) {
    console.error(e);
  }
};

exports.saveFile = async file => {
  try {
    let data = faker.lorem.sentence();
    let text = data.toString().toUpperCase();
    await write(file, Buffer.from(text));
    emitter.emit('file-saved', file);
  } catch (e) {
    emitter.emit('file-error', file);
    console.error(e);
  }
};

exports.alterFile = async file => {
  await exports.loadFile(file);
  await exports.saveFile(file);
};

let file = process.argv.slice(2).shift();
exports.alterFile(file);
