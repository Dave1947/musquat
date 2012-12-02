var page = process.argv[2];
var lim = process.argv[3];
var fs = require('fs');
var exec = require('child_process').exec;

if (!(page && lim)){
  console.error('supply page #');
  process.exit();
}

var map = {};
var scrape_alexa = require('../get_alexa_top_sites.js');
scrape_alexa(page, lim, function(e, allsites){
  exec('ls '+__dirname+'/../results/', function(e, data){
    var files = data.split('\n');
    files.forEach(function(file, i){
      files[i] = file.split('.json')[0];
    });
    Object.keys(allsites).forEach(function(rank){
      map[allsites[rank]] = files.indexOf(allsites[rank])>-1 ? true : false;
    });
    console.log(JSON.stringify(map));
  });
});
