var test = require('tape');
require('./console.js');

test('iife', function(t){
  t.equal(typeof console.mute, 'function', '.mute is fn');
  t.equal(typeof console.resume, 'function', '.resume is fn');
  t.end();
});

test('mute and resume', function(t){
  
  console.mute();
  console.log('log');
  console.log('muted');
  var muted = console.resume('preserve');
  t.equal(muted.join(), 'log,muted', 'muted data returned on resume');
  
  console.mute();
  console.log('moar');
  console.log('data');
  var history = console.resume();
  t.equal(history.join(), 'log,muted,moar,data', 'history preserved');

  console.mute();
  console.log('muted');
  console.log('again');
  var reset = console.resume();
  t.equal(reset.join(), 'muted,again', 'data reset is default');
  
  t.end();
});
