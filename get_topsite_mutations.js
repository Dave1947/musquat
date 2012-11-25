var get_alexa_top_sites = require('./get_alexa_top_sites.js');
var get_mutations = require('./get_mutations.js');


module.exports = function(offset, num_sites, cb){
  var mutations = [];
  get_alexa_top_sites(offset, num_sites, function(e, top_sites){
    Object.keys(top_sites).forEach(function(rank){
      get_mutations(top_sites[rank]).forEach(function(mutant){
        mutations.push(mutant);
      });;
    });
    return cb(e, mutations);
  });
}
