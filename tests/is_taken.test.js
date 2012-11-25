var taken =  'facebook.com';
var not_taken = 'thisdomainnottakenduhpoo.com';

var is_domain_taken = require('../is_domain_taken.js');

is_domain_taken(taken, function(e, res){
  console.log('taken is taken', res);
});

is_domain_taken(not_taken, function(e, res){
  console.log('not taken is taken', res);
});
