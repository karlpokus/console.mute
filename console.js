module.exports = (function foo() {
  var saved = process.stdout.write,
      data = [];

  console.mute = function() {
    process.stdout.write = function(str, encoding, fd) {
      data.push(str.replace(/\r?\n|\r/g, ''));
    };
  }

  console.resume = function(preserve) {
    process.stdout.write = saved;
    
    if (preserve) {
      return data;
    } else {
      var out = data;
      data = [];
      return out;
    }    
  }
})();
