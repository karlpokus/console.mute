module.exports = (function foo() {
  var stdoutSaved = process.stdout.write,
      stderrSaved = process.stderr.write,
      stdoutData = [],
      stderrData = [];

  console.mute = function(options) {
    process.stdout.write = function(str, encoding, fd) {
      stdoutData.push(
        options && options.keepNewLines
          ? str.replace(/(\r?\n|\r)$/, '')    // Only strip trailing newline
          : str.replace(/\r?\n|\r/g, '')
      );
    };
    process.stderr.write = function (str, encoding, fd) {
      stderrData.push(
        options && options.keepNewLines
          ? str.replace(/(\r?\n|\r)$/, '')    // Only strip trailing newline
          : str.replace(/\r?\n|\r/g, '')
      );
    }
  };

  console.resume = function(preserve) {
    process.stdout.write = stdoutSaved;
    process.stderr.write = stderrSaved;
    
    if (preserve) {
      return {
        stdout: stdoutData,
        stderr: stderrData
      };
    } else {
      var outstd = stdoutData;
      var outerr = stderrData;
      stdoutData = [];
      stderrData = [];
      return {
        stdout: outstd,
        stderr: outerr
      };
    }    
  }
})();
