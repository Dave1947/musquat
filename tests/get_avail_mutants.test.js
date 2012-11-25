var page = process.argv[2];
var lim = process.argv[3];
if (!(page && lim)){
  console.error('supply args');
  process.exit();
}

var get_avail_mutants = require('../get_avail_mutants.js');

get_avail_mutants(page, lim, function(e, avail_mutants){
  //console.log(JSON.stringify(avail_mutants));
  console.log('fin');
});
