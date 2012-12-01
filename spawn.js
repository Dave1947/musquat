var fork = require('child_process').fork;
var get_topsites = require('./get_alexa_top_sites.js')
var path = __dirname+'/get_pct_mutes_reg.js';

function fork_worker(site, cb){
  var child = fork(path, [site]);
  child.on('exit', cb);
  child.on('message', function(msg){
    console.log(msg);
  });
}

function spawn_site_workers(sites, cb){
  var completed = 0;
  sites.forEach(function(site){
    fork_worker(site, function(){
      completed+=1;
      if (completed==sites.length) return cb();
    });
  });
}

function get_vals_array(obj, n, m){
  var res = [];
  for (var i=n; i<m; i++){
    if (obj[i]) {
      res.push(obj[i]);
    }
  }
  return res;
}

var concurrency = 10;

function r_manage_spawning(start, obj, cb){
  spawn_site_workers(get_vals_array(obj, start, start+concurrency), function(){
    var new_start = start+concurrency;
    if (new_start > Object.keys(obj).length-1) return cb();
    return r_manage_spawning(new_start, obj, cb);
  });
}

var begin = process.argv[2];
var end = process.argv[3];

get_topsites(begin, end, function(e, res){
  console.log(res);
  r_manage_spawning(Object.keys(res)[0]/1, res, function(){
    console.log('all done');
  });
});
