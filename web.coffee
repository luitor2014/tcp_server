express = require("express")
http    = require("http")
qs      = require("querystring")
url     = require("url")

proxy = url.parse(process.env.PROXIMO_URL)

app = express.createServer(
  express.logger())

app.get "/*", (req, res) ->
  headers =
    "Proxy-Authorization": "Basic #{new Buffer(proxy.auth).toString("base64")}"
    "Host": "httpbin.org"
  delete req.headers.host
  headers[key] = val for key, val of req.headers

  options =
    hostname: proxy.hostname
    port: proxy.port || 80
    path: "http://directorioilo.com"
    headers: headers

  http.get options, (httpbin_res) ->
    res.writeHead httpbin_res.statusCode, httpbin_res.headers
    httpbin_res.pipe(res)

app.listen process.env.PORT || 5000
