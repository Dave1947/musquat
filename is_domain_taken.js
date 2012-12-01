var exec = require('child_process').exec;

function whois(url, cb){
  child = exec('whois '+url, cb);
}

function get_domainr_info(url, cb){
  exec('curl domai.nr/api/json/info?q='+url, cb);
}

module.exports = function(url, cb){
  get_domainr_info(url, function(e, data){
    try {
      data = JSON.parse(data);
    } catch (e){
      return cb(e);
    }
    // is it taken?
    return cb(e, data.availability!='available');
  });
};
