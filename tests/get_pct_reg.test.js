var fs = require('fs');
var traffic = JSON.parse(fs.readFileSync(__dirname+'/../traffic.json', 'utf8'));

function get_pct_reg(mutations){
  var true_count = 0;
  Object.keys(mutations.outcomes).forEach(function(m){
    true_count += mutations.outcomes[m] ? 1 : 0;
  });
  return ((true_count/Object.keys(mutations.outcomes).length)*100);
}

function get_traffic_stat(traffic){
  return traffic[0]/1;
}

Object.keys(traffic).forEach(function(site, i){
  //if (i>0) process.exit();
  var mutes = JSON.parse(fs.readFileSync(__dirname+'/../results/'+site+'.json', 'utf8'));
  var res = {
    site:site,
    traffic:get_traffic_stat(traffic[site]),
    reg:get_pct_reg(mutes)
  };
  traffic[site] = res;
});

console.log(JSON.stringify(traffic));
