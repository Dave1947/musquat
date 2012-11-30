var fs = require('fs');
var mutes_dirty = JSON.parse(fs.readFileSync('../data/mutes.json', 'utf8'));
var mutes_clean = [];
var map_keys = Object.keys(require('../map.js'));

function cleanMute(m){
  var clean = '';
  for (var i=0;i<m.length;i++){
    //console.log(m.charAt(i));
    //console.log(map_keys.indexOf(m.charAt(i)));
    if (map_keys.indexOf(m.charAt(i)) || m.charAt(i)==='.'){
      clean+=m.charAt(i);
    }
  }
  clean = clean.replace("'", '');
  clean = clean.replace("'", '');
  return clean;
}

mutes_dirty.forEach(function(m, i){
  if (m.indexOf('false')){
    return false;
  }
  m = m.split(' ')[1];
  if (m){
    mutes_clean.push(cleanMute(m));
  }
});

console.log(JSON.stringify(mutes_clean));
