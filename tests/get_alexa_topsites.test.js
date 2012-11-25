var page = process.argv[2];
var lim = process.argv[3];
if (!(page && lim)){
  console.error('supply page #');
  process.exit();
}
var scrape_alexa = require('../get_alexa_top_sites.js');
scrape_alexa(page, lim, function(e, data){
  console.log(data);
});
