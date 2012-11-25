var exec = require('child_process').exec;
var expected_urls_per_page = 25;

function get_alexa_url(page_num){
  return 'http://www.alexa.com/topsites/global'+escape(';')+page_num;
}

function r_parse_html(html, start_from, page, rank, rank_map){
  var start = '<span class="small topsites-label">'
  , start_index = html.indexOf(start, start_from);

  if (Object.keys(rank_map).length==expected_urls_per_page) {
    return rank_map;
  }

  var stop = '</span>'
  , stop_index = html.indexOf(stop, start_index)
  , site = html.substr(start_index+start.length, stop_index-(start_index+start.length));
  rank_map[rank.toString()] = site;

  return r_parse_html(html, stop_index, page, rank+1, rank_map);
}

function add_rank_map(global, local, page){
  Object.keys(local).forEach(function(local_key){
    var global_key = (page*25)+local_key/1;
    global[global_key] = local[local_key];
  });
  return global;
}

module.exports = function(offset, num_sites, cb){

  var global_rank_map = {}
  , pages = num_sites/25;

  if (num_sites%25) pages+=1;

  console.log(offset);
  for (var p=offset; p<offset+pages; p++){
    (function(page){
      child = exec('curl '+get_alexa_url(p), function (error, html, stderr){
        var rank_map = r_parse_html(html, 0, page, 0, {});
        global_rank_map = add_rank_map(global_rank_map, rank_map, page);
        if (Object.keys(global_rank_map).length==num_sites){
          return cb(error, global_rank_map);
        }
      });
    })(p);

  }

};

