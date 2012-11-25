var get_topsite_mutations = require('./get_topsite_mutations.js');
var is_taken = require('./is_domain_taken.js');

function r_is_taken(urls_test, urls_avail, cb){
  if(!urls_test.length){
    return cb(null, urls_avail);
  }
  var url_to_test = urls_test.shift();
  is_taken(url_to_test, function(e, res){
    console.log(res, url_to_test);
    if (!e && !res){
      urls_avail.push(url_to_test);
    }
    r_is_taken(urls_test, urls_avail, cb);
  });
}

module.exports = function(offset, num_sites, cb){
  get_topsite_mutations(offset, num_sites, function(e, mutations){
    r_is_taken(mutations, [], function(e, available_mutants){
      return cb(e, available_mutants);      
    });
  });

};
