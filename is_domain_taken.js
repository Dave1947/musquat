var exec = require('child_process').exec;

function whois(url, cb){
  child = exec('whois '+url, cb);
}

module.exports = function(url, cb){
  whois(url, function(error, stdout, stderr){
    // if we find 'no match for' then its available
    // return true if taken false if avail
    return cb(error, stdout.indexOf('No match for')===-1);
  });
};
