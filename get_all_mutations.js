var chars = require('./chars.js').split('');

get_tld = function(url_split){
  return url_split.splice(1, url_split.length+1).join('.');
}

module.exports = function(url){
  var url_split = url.split('.')
  , pre = url_split[0]
  , tld = get_tld(url_split) 
  , permutations = [];

  pre.split('').forEach(function(_char, char_index){
    chars.forEach(function(char){
      if (char==_char) return;
      var pre_permutation_array = pre.split('');
      pre_permutation_array[char_index] = char;
      permutations.push(pre_permutation_array.join('')+'.'+tld)
    });
  });

  return permutations;
};
