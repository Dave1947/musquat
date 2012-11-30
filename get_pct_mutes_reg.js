var get_topsites = require('./get_alexa_top_sites.js')
, get_traffic_stats = require('./get_traffic_stats.js')
, is_domain_taken = require('./is_domain_taken.js')
, get_all_mutations = require('./get_all_mutations.js')
, data = [];

//make this recursive - too many reqs/second
function get_available_domains(outcomes, urls, cb){
  if(Object.keys(outcomes).length===urls.length) return cb(outcomes);
  var url = urls.shift();
  is_domain_taken(url, function(e, is_taken){
    outcomes[url] = is_taken;
    return get_available_domains(outcomes, urls, cb);
  });
}

function r_get_data(data, index, packages, cb){
  if (index>Object.keys(data).length) return cb(packages);
  var site = data[index];
  get_traffic_stats(site, function(tstats){
    var mutations = get_all_mutations(site);
    get_available_domains({}, mutations, function(outcomes){
      packages.push({
        site:site,
        outcomes:outcomes,
        tstats:tstats
      });
      return r_get_data(data, index+1, packages, cb);
    });
  });
};

//         strt stop
get_topsites(0, 25, function(e, res){
  r_get_data(res, 0, [], function(data){
    console.log(JSON.stringify(data));
  });
});
