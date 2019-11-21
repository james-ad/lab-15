'use strict';

const emitter = require('./emitter');

emitter.on('file-saved', payload => {
  console.log(`SUCCESS: Changing file ${payload.file} succeeded`);
});
emitter.on('file-error', payload => {
  console.log(
    `ERROR: Changing file ${payload.file} failed with error ${payload.text}`
  );
});