/**
 *  Load dependencies.
 */
var path = require('path');
var qs = require('querystring');
var http = require('http');
var url = require('url');
var _ = require('underscore');

/**
 * Constructor
 * @param {string} [options] a string of options
 * @see `Weather.config()` for possible options to be passed.
 * @api public
 */
Weather = function () {
  var options = {};
}

/**
 * Weather module options initialization.
 * @param {object} [options] an object containing initialisation options.
 *  - {string} [url] base url pointing to the api usually there is no need to change it.
 *  - {string} [api_key] api key for weatheronline.com api.
 *  - {string} [format] format in which the results are returned available json, xml, csv, tab default: json;
 *  - {boolean} [isPremium] is the api key is for free or premium edition.
 *  - {string} [version] version of the api defaults to `v1`
 * @api public
 */
Weather.prototype.config = function(options) {
  var options = options || {}
  if(!options.api_key) throw new Error('You need to specify weatheronline.com API key to use the module');
  options.api_key = options.api_key || undefined; 
  options.url = options.url || 'api.worldweatheronline.com'; 
  options.format = options.format || 'json'; 
  options.isPremium = options.isPremium || false;
  options.version = options.version || 'v1';
  
  edition = options.isPremium ? 'premium' : 'free';
  var opts = {};
  opts.url = options.url;
  opts.path = path.join(edition, options.version);
  opts.qs = {key: options.api_key, format: options.format};
  opts.format = options.format;
  
  this.options = opts;
}

/**
 * Retrieves local weahter by given location 
 * @see worldweatheronline.com `LOCAL WEATHER` api
 * @param {string} [query] Query by US/CA/UK postal code, city name or lat,lng pair.
 * @param {object} [optns] additional options for query please read worldweatheronline.com docs for available options.
 * @see worldweatheronline.com docs for more details.
 * @api public
 */
Weather.prototype.forecast = function (query, optns, cb) {
  var querystring = optns || {};
  querystring.q = query;
  querystring = _.extend(this.options.qs, querystring);
  querystring.num_of_days = optns.num_of_days || 5;
  var pathString = path.join(this.options.path, 'weather.ashx');
  
  var formattedPath = url.format({pathname: pathString, query: querystring});
  getRequest(this.options.url, formattedPath, function(err, result){
    if(err) return cb(err);
    return cb(err, result);
  });
}

/**
 *  Finds closest location for the weather to be retrieved
 * @see worldweatheronline.com `SEARCH` api
 * @param {string} [query] Query by US/CA/UK postal code, city name or lat,lng pair.
 * @param {object} [optns] additional options for query please read worldweatheronline.com docs for available options.
 * @see worldweatheronline.com docs for more details.
 * @api public
 */
Weather.prototype.search = function (query, optns, cb) {
  var querystring = optns || {};
  querystring.q = query;
  querystring = _.extend(this.options.qs, querystring);
  var pathString = path.join(this.options.path, 'search.ashx')
  var formattedPath = url.format({pathname: pathString, query: querystring});
  getRequest(this.options.url, formattedPath, function(err, result) {
    if (err) return cb(err);
    return cb(err, result.search_api.result);
  });
}

/**
 * Sends request to the api
 * @param {string} [host] 
 * @param {string} [path]
 * @param {function} [cb] Callback function
 * @return {function} returns a cb function
 * @api private
 */
var getRequest = function(host, path, cb) {
  var req = http.get({
    hostname: host,
    port: 80,
    path: '/'+path,
  },
  function(res) {
    var data = '';
    res.setEncoding('utf8');
    res.on('error', function(err) {
      return cb(err);
    });  
    res.on('data', function(chunk) {
      data += chunk;
    });    
    res.on('end', function () {
      return cb(null, JSON.parse(data));
    })
  })
  .on('error', function (err) {
    return cb(err);
  });
}

var weather = module.exports = exports = new Weather();
