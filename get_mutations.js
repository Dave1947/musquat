var map = require('./map.js');

get_tld = function(url_split){
  return url_split.splice(1, url_split.length+1).join('.');
}

module.exports = function(url){

  var url_split = url.split('.')
  , pre = url_split[0]
  , tld = get_tld(url_split) 
  , permutations = [];

  pre.split('').forEach(function(char, char_index){
    var near_chars_str = map[char];
    var near_chars_array = near_chars_str.split('');
    near_chars_array.forEach(function(near_char){
      var pre_permutation_array = pre.split('');
      pre_permutation_array[char_index] = near_char;
      permutations.push(pre_permutation_array.join('')+'.'+tld)
    });
  });

  return permutations;
};
