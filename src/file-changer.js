'use strict';

const emitter = require('./emitter');
const fs = require('fs');
const util = require('util');
const faker = require('faker');
const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);
const logger = require('./logger');

module.exports = exports = {};

emitter.on('file-saved', file => {
  console.log(file);
});

emitter.on('fileError', file => {
  console.log(file);
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
    emitter.emit('file-saved', {
      status: 1,
      file: file,
      text: `${file} saved`
    });
  } catch (e) {
    emitter.emit('file-error', {
      status: 0,
      file: file,
      text: e
    });
    console.error(e);
  }
};

exports.alterFile = async file => {
  await exports.loadFile(file);
  await exports.saveFile(file);
};
