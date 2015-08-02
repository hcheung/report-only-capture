var _ = require('lodash');
var async = require('async');
var request = require('request');
var querystring = require('querystring');

var browsers = [{
  "device": null,
  "browser_version": "37.0",
  "os": "Windows",
  "browser": "firefox",
  "os_version": "8"
}];

var creds = {
  user: 'zacktollman2',
  pass: 's7fegnaduDZu2sHsoRqX',
};

// Placeholder for shared config
var config = {};
var base_url = 'https://www.tollmanz.com/test.html';

async.each(browsers, function(browser, callback) {
  var localConfig = _.extend({}, config);
  var get_vars = querystring.stringify(browser);
  var url = base_url + '?' + get_vars;

  // Set config
  localConfig.url = url;
  localConfig.screenshots = [ browser ];

  // Make the request
  request.post({
    url: 'https://www.browserstack.com/screenshots',
    json: localConfig,
    auth: creds,
    headers: [{
      name: 'content-type',
      value: 'application/json'
    },
    {
      name: 'accept',
      value: 'application/json'
    }]
  },
  function (error, response, body) {
    if (error) {
      throw error;
    }

    if (!error && response.statusCode == 200) {
      console.log(body)
    }
  });

  callback();
});
