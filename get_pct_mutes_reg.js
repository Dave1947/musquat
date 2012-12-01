var get_topsites = require('./get_alexa_top_sites.js')
, get_traffic_stats = require('./get_traffic_stats.js')
, is_domain_taken = require('./is_domain_taken.js')
, get_all_mutations = require('./get_all_mutations.js')
, fs = require('fs')
, data = [];

var site = process.argv[2];

var log = process.send || console.log;

function get_available_domains(outcomes, urls, cb){
  if(!urls.length) return cb(outcomes);
  var url = urls.shift();
  is_domain_taken(url, function(e, is_taken){
    log(url);
    log(arguments);
    outcomes[url] = is_taken;
    return get_available_domains(outcomes, urls, cb);
  });
}

function get_site_data(site, cb){
  //get_traffic_stats(site, function(tstats){
    var mutations = get_all_mutations(site);
    get_available_domains({}, mutations, function(outcomes){
     return cb({ 
        site:site,
        outcomes:outcomes
      });
    });
  //});
};

get_site_data(site, function(data){
  fs.writeFileSync(__dirname+'/results/'+site+'.json', JSON.stringify(data));
  process.exit();
});
