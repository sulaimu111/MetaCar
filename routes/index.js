var express = require('express');
var app = express();
var router = express.Router();
const dns = require('dns');
const axios = require('axios');
var server = require('../app.js')
const io = require('socket.io')(server, {cors:{origin:"*"}})
// const io = require('socket.io')(app, {cors:{origin:"*"}})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Select Robot' });
});

router.get('/Metaverse_RoboMaster1', function(req, res, next){
  dns.lookup(require('os').hostname(), (err, address, family) => {
    console.log('address: %j family: IPv%s', address, family)
    res.render('bot1', { title: 'RoboMaster1', address: address });
  });
})

router.get('/Metaverse_RoboMaster2', function(req, res, next){
  res.render('bot2', { title: 'RoboMaster2' });
})

router.get('/Metaverse_RoboMaster3', function(req, res, next){
  res.render('bot3', { title: 'RoboMaster3' });
})


router.get('/story', function(req, res, next) {
  res.render('story', { title: 'Story' });
});

router.get('/metaverse', function(req, res, next) {
  require('dns').reverse(req.connection.remoteAddress, function(err, domains) {
    console.log(domains);
});
  res.render('metaverse', { title: 'metaverse' });
});



router.get('/test', function(req, res, next) {
  res.render('bot2', { title: 'RoboMaster2' });
});


// router.get('/posttest', function(req, res, next){
//   res.render('postTest', { title: 'postTest' });
// })

// router.post('/posttest', function(req, res, next){
//   console.log(req.body);
//   // res.json({"target":"ok"});
//   res.end("nodejs_ok");
//   // socket.emit('message', "noooo")
// })


router.post('/posttest', function(req, res, next){
  var target = req.body;
  target = JSON.stringify(target);
  target = target.substring(2, target.length);
  target = target.substring(0, target.length-5);
  target = target.replace(/\\/g,'');
  target = JSON.parse(target);
  // var target3 = JSON.parse(target2);
  console.log(target.target);
  console.log(target.user_ip);
  req.io.emit("message", target.target);
  res.end("nodejs_ok");
  if(target.target == 2){
    req.io.emit("message2", "hahaha")
    console.log("haha")
  }
})

module.exports = router;
