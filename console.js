module.exports = (function foo() {
  var saved = process.stdout.write,
      data = [];

  console.mute = function() {
    process.stdout.write = function(str, encoding, fd) {
      data.push(str.replace(/\r?\n|\r/g, ''));
    };
  }

  console.resume = function() {
    process.stdout.write = saved;
    var out = data;
    data = [];
    return out;
  }
})();
