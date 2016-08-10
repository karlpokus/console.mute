[![npm version](https://badge.fury.io/js/console.mute.svg)](https://badge.fury.io/js/console.mute)
[![Build Status](https://travis-ci.org/karlpokus/console.mute.svg?branch=master)](https://travis-ci.org/karlpokus/console.mute)

# console.mute
Temporarily mute the console in node.js. Works with `.log` and `.error`. Resume and retrieve logged data later. Useful for intercepting logged data from any module and when testing modules that insist on logging all the things. Based on [this gist](https://gist.github.com/pguillory/729616#file-gistfile1-js-L8). [Here's a gist](https://gist.github.com/karlpokus/473de03f769f39796d44d3014c979719) that works in the browser.

# Install
```
$ npm install console.mute
```

# Usage
```javascript
require('console.mute'); // adds mute and resume to console

console.log('a'); // will log
console.mute(); // mutes log
console.log('b'); // will not log
console.error('c'); // will not log
var data = console.resume(); // resumes log and returns logged data during mute
console.log('c'); // will log
console.log(data); // logs {stdout: ['b'], stderr: ['c']}

// alter history
console.mute();
console.log('a');
var part = console.resume('preserve'); // preserves history
console.mute();
console.log('b');
var history = console.resume(); // reset history
console.log(history.stdout); // logs ['a', 'b']
```

# Test
```
$ npm test
```

# Licence
MIT
