var fs = require('fs');
var get_traffic = require('../get_traffic_stats.js');
var async = require('async');
var sites = JSON.parse(fs.readFileSync(__dirname+'/../sites.json'));
var map = {};
var current = 0;
var funcs = [];


//Object.keys(sites).splice(0,2).forEach(function(i){
Object.keys(sites).forEach(function(i){
  var f = function(cb){
    var site = sites[i.toString()];
    get_traffic(site, function(data){
      console.log(i, site, data);
      map[site] = data;
      return cb(null, true);
    });
  };
  funcs.push(f);
});

async.series(funcs, function(){
  fs.writeFileSync(__dirname+'/traffic.json', JSON.stringify(map));
});
