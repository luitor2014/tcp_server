http = require("http")
url  = require("url")

proxy = url.parse(process.env.PROXIMO_URL)

  options =
    hostname: proxy.hostname
    port:     proxy.port || 80
    path:     "http://api.someservice.com/endpoint"
    headers:
      "Proxy-Authorization": "Basic #{new Buffer(proxy.auth).toString("base64")}"

  http.get options, (res) ->
    console.log "status code", res.statusCode
    console.log "headers", res.headers
