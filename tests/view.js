var start = process.argv[2]/1;
var stop = process.argv[3]/1;

if (!(start && stop)){
  console.log('start & stop plz')
  process.exit();
}


var fs = require('fs');
var mutes_avail = JSON.parse(fs.readFileSync('../data/avail.json', 'utf8'));


for (var i=start; i<stop; i++){
  console.log(mutes_avail[i]);
}

console.log('( displaying:', start, 'through', stop, 'of', mutes_avail.length, ')');
