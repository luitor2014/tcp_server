var app, express, http, proxy, qs, url;
express = require("express");
http = require("http");
qs = require("querystring");
url = require("url");
proxy = url.parse(process.env.PROXIMO_URL);
app = express.createServer(express.logger());
app.get("/*", function(req, res) {
  var headers, key, options, val, _ref;
  headers = {
    "Proxy-Authorization": "Basic " + (new Buffer(proxy.auth).toString("base64")),
    "Host": "httpbin.org"
  };
  delete req.headers.host;
  _ref = req.headers;
  for (key in _ref) {
    val = _ref[key];
    headers[key] = val;
  }
  options = {
    hostname: proxy.hostname,
    port: proxy.port || 80,
    path: "http://httpbin.org/" + req.params[0] + "?" + (qs.stringify(req.query)),
    headers: headers
  };
  return http.get(options, function(httpbin_res) {
    res.writeHead(httpbin_res.statusCode, httpbin_res.headers);
    return httpbin_res.pipe(res);
  });
});
app.listen(process.env.PORT || 5000);

