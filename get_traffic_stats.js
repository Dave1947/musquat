var cheerio = require('cheerio')
, exec = require('child_process').exec;

module.exports = function(site, cb){
  var url = 'http://www.alexa.com/siteinfo/'+site;
  child = exec('curl '+url, function (error, html, stderr){
    var $ = cheerio.load(html);
    var stats = $('.visitors_percent td.avg').text().split('%');
    return cb(stats.splice(0,4));
  });
}
