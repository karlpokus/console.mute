var test = require('tape');
require('./console.js');

test('mute', function(t){
  t.equal(typeof console.mute, 'function', '.mute is fn');
  t.equal(typeof console.resume, 'function', '.resume is fn');

  console.mute();
  console.log('log');
  console.log('is');
  console.log('muted');
  var data = console.resume();

  t.equal(data.join(), 'log,is,muted', 'muted data returned on resume');

  console.mute();
  console.log('muted');
  console.log('again');
  var data = console.resume();

  t.equal(data.join(), 'muted,again', 'data is reset');
  t.end();
})
