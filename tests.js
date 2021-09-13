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
  t.equal(muted.stdout.join(), 'log,muted', 'muted stdout data returned on resume');

  console.mute();
  console.log('moar');
  console.log('data');
  var history = console.resume();
  t.equal(history.stdout.join(), 'log,muted,moar,data', 'history preserved');

  console.mute();
  console.log('muted');
  console.log('again');
  var reset = console.resume();
  t.equal(reset.stdout.join(), 'muted,again', 'data reset is default');

  console.mute();
  console.error('oh');
  console.error('noes');
  var mutedErr = console.resume('preserve');
  t.equal(mutedErr.stderr.join(), 'oh,noes', 'muted stderr data returned on resume');

  console.mute();
  console.error('dis');
  console.error('bad');
  var errHistory = console.resume();
  t.equal(errHistory.stderr.join(), 'oh,noes,dis,bad', 'history preserved');

  console.mute({ keepNewLines: false });
  console.log('muted\r\nagain');
  console.log('and\nagain\nand\nagain');
  var reset = console.resume();
  t.equal(reset.stdout.join(), 'mutedagain,andagainandagain', 'strip newlines if options.keepNewLines is false');

  console.mute({ keepNewLines: true });
  console.log('muted\r\nagain');
  console.log('and\nagain\nand\nagain');
  var reset = console.resume();
  t.equal(reset.stdout.join(), 'muted\r\nagain,and\nagain\nand\nagain', 'do not strip newlines if options.keepNewLines is true');

  t.end();
});
