var httpproxy = require('http');
var express = require('express');

var time = new Date().getTime();

var httpserver = new express();

//Change this
vcapSenv = process.env.VCAP_SERVICES;
    vcapValue = {};
    if (vcapSenv!= null) {
      try {
        vcapValue = JSON.parse(vcapSenv);
      } catch (error) {
        e = error;
        throwError("env var VCAP_SERVICES is not JSON: /" + vcapSenv + "/");
      }
    }

var call = 0;

//Register handler

httpserver.get("/proxy-page", function(req, res) {
   var proxyclient = httpproxy.request(
     {
       host: '254.254.254.254',
       port: 9898,
       user: '1',
       password: '2',
       method: 'GET',
       path: 'http://perdu.com/'
     }, function (response) {
          response.on('data', function (body) {
          console.log('Jai recu'+body.toString());
        });
     });
   proxyclient.end();
   res.send({"You requested this page : ": "url dune page"});
   call += 1;
});

httpserver.get("/4", function(req, res) {
   var Client = req.socket['remoteAddress']+":"+req.socket['remotePort'];
   res.send({"NodeJS App4 health": "OK", "call": call});
   call += 1;
   console.log("Sending health state OK to "+Client);
});

httpserver.get("/services", function(req, res) {
   var vcap_services = JSON.parse(process.env.VCAP_SERVICES);
   if (vcap_services != null) {
     res.send({"vcap_services": vcap_services});
   }
   else {
     res.send({"vcap_services": "null"});
   }
}); 

httpserver.get("/application", function(req, res) {
   var vcap_application = JSON.parse(process.env.VCAP_APPLICATION);
   if (vcap_application != null) {
     res.send({"vcap_application": vcap_application});
   }
   else {
     res.send({"vcap_application": "null"});
   }
});

//Support CF & Legacy
httpserver.listen(process.env.PORT || 8000);
