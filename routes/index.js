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

router.get('/Metaverse_RoboMaster4', function(req, res, next){
  res.render('bot4', { title: 'RoboMaster4' });
})

router.get('/Metaverse_RoboMaster5', function(req, res, next){
  res.render('bot5', { title: 'RoboMaster5' });
})

router.get('/Metaverse_RoboMaster6', function(req, res, next){
  res.render('bot6', { title: 'RoboMaster6' });
})

router.get('/Metaverse_RoboMaster7', function(req, res, next){
  res.render('bot7', { title: 'RoboMaster7' });
})

router.get('/Metaverse_RoboMaster8', function(req, res, next){
  res.render('bot8', { title: 'RoboMaster8' });
})

router.get('/Metaverse_RoboMaster9', function(req, res, next){
  res.render('bot9', { title: 'RoboMaster9' });
})

router.get('/Metaverse_RoboMaster10', function(req, res, next){
  res.render('bot10', { title: 'RoboMaster10' });
})

router.get('/Metaverse_RoboMaster11', function(req, res, next){
  res.render('bot11', { title: 'RoboMaster11' });
})

router.get('/Metaverse_RoboMaster12', function(req, res, next){
  res.render('bot12', { title: 'RoboMaster12' });
})

router.get('/Metaverse_RoboMaster13', function(req, res, next){
  res.render('bot13', { title: 'RoboMaster13' });
})

router.get('/Metaverse_RoboMaster14', function(req, res, next){
  res.render('bot14', { title: 'RoboMaster14' });
})

router.get('/Metaverse_RoboMaster15', function(req, res, next){
  res.render('bot15', { title: 'RoboMaster15' });
})

router.get('/Metaverse_RoboMaster16', function(req, res, next){
  res.render('bot16', { title: 'RoboMaster16' });
})

router.get('/Metaverse_RoboMaster17', function(req, res, next){
  res.render('bot17', { title: 'RoboMaster17' });
})

router.get('/Metaverse_RoboMaster18', function(req, res, next){
  res.render('bot18', { title: 'RoboMaster18' });
})

router.get('/Metaverse_RoboMaster19', function(req, res, next){
  res.render('bot19', { title: 'RoboMaster19' });
})

router.get('/Metaverse_RoboMaster20', function(req, res, next){
  res.render('bot20', { title: 'RoboMaster20' });
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




// ======================post======================

router.post('/posttest', function(req, res, next){
  var target = req.body;
  target = JSON.stringify(target);
  target = target.substring(2, target.length);
  target = target.substring(0, target.length-5);
  target = target.replace(/\\/g,'');
  target = JSON.parse(target);
  // var target3 = JSON.parse(target2);
  console.log(target.target);
  console.log(req.body);
  // console.log(target.user_ip);
  req.io.emit("message", target.target);
  res.end("nodejs_ok");
})

router.post('/posttest2', function(req, res, next){
  var target = req.body;
  target = JSON.stringify(target);
  target = target.substring(2, target.length);
  target = target.substring(0, target.length-5);
  target = target.replace(/\\/g,'');
  target = JSON.parse(target);
  // var target3 = JSON.parse(target2);
  console.log(target.target);
  console.log(req.body);
  // console.log(target.user_ip);
  req.io.emit("message2", target.target);
  res.end("nodejs_ok");
})

router.post('/posttest3', function(req, res, next){
  var target = req.body;
  target = JSON.stringify(target);
  target = target.substring(2, target.length);
  target = target.substring(0, target.length-5);
  target = target.replace(/\\/g,'');
  target = JSON.parse(target);
  // var target3 = JSON.parse(target2);
  console.log(target.target);
  console.log(req.body);
  // console.log(target.user_ip);
  req.io.emit("message3", target.target);
  res.end("nodejs_ok");
})

router.post('/posttest4', function(req, res, next){
  var target = req.body;
  target = JSON.stringify(target);
  target = target.substring(2, target.length);
  target = target.substring(0, target.length-5);
  target = target.replace(/\\/g,'');
  target = JSON.parse(target);
  // var target3 = JSON.parse(target2);
  console.log(target.target);
  console.log(req.body);
  // console.log(target.user_ip);
  req.io.emit("message4", target.target);
  res.end("nodejs_ok");
})

router.post('/posttest5', function(req, res, next){
  var target = req.body;
  target = JSON.stringify(target);
  target = target.substring(2, target.length);
  target = target.substring(0, target.length-5);
  target = target.replace(/\\/g,'');
  target = JSON.parse(target);
  // var target3 = JSON.parse(target2);
  console.log(target.target);
  console.log(req.body);
  // console.log(target.user_ip);
  req.io.emit("message5", target.target);
  res.end("nodejs_ok");
})

router.post('/posttest6', function(req, res, next){
  var target = req.body;
  target = JSON.stringify(target);
  target = target.substring(2, target.length);
  target = target.substring(0, target.length-5);
  target = target.replace(/\\/g,'');
  target = JSON.parse(target);
  // var target3 = JSON.parse(target2);
  console.log(target.target);
  console.log(req.body);
  // console.log(target.user_ip);
  req.io.emit("message6", target.target);
  res.end("nodejs_ok");
})

router.post('/posttest7', function(req, res, next){
  var target = req.body;
  target = JSON.stringify(target);
  target = target.substring(2, target.length);
  target = target.substring(0, target.length-5);
  target = target.replace(/\\/g,'');
  target = JSON.parse(target);
  // var target3 = JSON.parse(target2);
  console.log(target.target);
  console.log(req.body);
  // console.log(target.user_ip);
  req.io.emit("message7", target.target);
  res.end("nodejs_ok");
  if(target.target == 2){
    req.io.emit("message2", "hahaha")
    console.log("haha")
  }
})

router.post('/posttest8', function(req, res, next){
  var target = req.body;
  target = JSON.stringify(target);
  target = target.substring(2, target.length);
  target = target.substring(0, target.length-5);
  target = target.replace(/\\/g,'');
  target = JSON.parse(target);
  // var target3 = JSON.parse(target2);
  console.log(target.target);
  console.log(req.body);
  // console.log(target.user_ip);
  req.io.emit("message8", target.target);
  res.end("nodejs_ok");
  if(target.target == 2){
    req.io.emit("message2", "hahaha")
    console.log("haha")
  }
})

router.post('/posttest9', function(req, res, next){
  var target = req.body;
  target = JSON.stringify(target);
  target = target.substring(2, target.length);
  target = target.substring(0, target.length-5);
  target = target.replace(/\\/g,'');
  target = JSON.parse(target);
  // var target3 = JSON.parse(target2);
  console.log(target.target);
  console.log(req.body);
  // console.log(target.user_ip);
  req.io.emit("message9", target.target);
  res.end("nodejs_ok");
  if(target.target == 2){
    req.io.emit("message2", "hahaha")
    console.log("haha")
  }
})

router.post('/posttest10', function(req, res, next){
  var target = req.body;
  target = JSON.stringify(target);
  target = target.substring(2, target.length);
  target = target.substring(0, target.length-5);
  target = target.replace(/\\/g,'');
  target = JSON.parse(target);
  // var target3 = JSON.parse(target2);
  console.log(target.target);
  console.log(req.body);
  // console.log(target.user_ip);
  req.io.emit("message10", target.target);
  res.end("nodejs_ok");
  if(target.target == 2){
    req.io.emit("message2", "hahaha")
    console.log("haha")
  }
})

router.post('/posttest11', function(req, res, next){
  var target = req.body;
  target = JSON.stringify(target);
  target = target.substring(2, target.length);
  target = target.substring(0, target.length-5);
  target = target.replace(/\\/g,'');
  target = JSON.parse(target);
  // var target3 = JSON.parse(target2);
  console.log(target.target);
  console.log(req.body);
  // console.log(target.user_ip);
  req.io.emit("message11", target.target);
  res.end("nodejs_ok");
  if(target.target == 2){
    req.io.emit("message2", "hahaha")
    console.log("haha")
  }
})

router.post('/posttest12', function(req, res, next){
  var target = req.body;
  target = JSON.stringify(target);
  target = target.substring(2, target.length);
  target = target.substring(0, target.length-5);
  target = target.replace(/\\/g,'');
  target = JSON.parse(target);
  // var target3 = JSON.parse(target2);
  console.log(target.target);
  console.log(req.body);
  // console.log(target.user_ip);
  req.io.emit("message12", target.target);
  res.end("nodejs_ok");
  if(target.target == 2){
    req.io.emit("message2", "hahaha")
    console.log("haha")
  }
})

router.post('/posttest13', function(req, res, next){
  var target = req.body;
  target = JSON.stringify(target);
  target = target.substring(2, target.length);
  target = target.substring(0, target.length-5);
  target = target.replace(/\\/g,'');
  target = JSON.parse(target);
  // var target3 = JSON.parse(target2);
  console.log(target.target);
  console.log(req.body);
  // console.log(target.user_ip);
  req.io.emit("message13", target.target);
  res.end("nodejs_ok");
  if(target.target == 2){
    req.io.emit("message2", "hahaha")
    console.log("haha")
  }
})

router.post('/posttest14', function(req, res, next){
  var target = req.body;
  target = JSON.stringify(target);
  target = target.substring(2, target.length);
  target = target.substring(0, target.length-5);
  target = target.replace(/\\/g,'');
  target = JSON.parse(target);
  // var target3 = JSON.parse(target2);
  console.log(target.target);
  console.log(req.body);
  // console.log(target.user_ip);
  req.io.emit("message14", target.target);
  res.end("nodejs_ok");
  if(target.target == 2){
    req.io.emit("message2", "hahaha")
    console.log("haha")
  }
})

router.post('/posttest15', function(req, res, next){
  var target = req.body;
  target = JSON.stringify(target);
  target = target.substring(2, target.length);
  target = target.substring(0, target.length-5);
  target = target.replace(/\\/g,'');
  target = JSON.parse(target);
  // var target3 = JSON.parse(target2);
  console.log(target.target);
  console.log(req.body);
  // console.log(target.user_ip);
  req.io.emit("message15", target.target);
  res.end("nodejs_ok");
  if(target.target == 2){
    req.io.emit("message2", "hahaha")
    console.log("haha")
  }
})

router.post('/posttest16', function(req, res, next){
  var target = req.body;
  target = JSON.stringify(target);
  target = target.substring(2, target.length);
  target = target.substring(0, target.length-5);
  target = target.replace(/\\/g,'');
  target = JSON.parse(target);
  // var target3 = JSON.parse(target2);
  console.log(target.target);
  console.log(req.body);
  // console.log(target.user_ip);
  req.io.emit("message16", target.target);
  res.end("nodejs_ok");
  if(target.target == 2){
    req.io.emit("message2", "hahaha")
    console.log("haha")
  }
})

router.post('/posttest17', function(req, res, next){
  var target = req.body;
  target = JSON.stringify(target);
  target = target.substring(2, target.length);
  target = target.substring(0, target.length-5);
  target = target.replace(/\\/g,'');
  target = JSON.parse(target);
  // var target3 = JSON.parse(target2);
  console.log(target.target);
  console.log(req.body);
  // console.log(target.user_ip);
  req.io.emit("message17", target.target);
  res.end("nodejs_ok");
  if(target.target == 2){
    req.io.emit("message2", "hahaha")
    console.log("haha")
  }
})

router.post('/posttest18', function(req, res, next){
  var target = req.body;
  target = JSON.stringify(target);
  target = target.substring(2, target.length);
  target = target.substring(0, target.length-5);
  target = target.replace(/\\/g,'');
  target = JSON.parse(target);
  // var target3 = JSON.parse(target2);
  console.log(target.target);
  console.log(req.body);
  // console.log(target.user_ip);
  req.io.emit("message18", target.target);
  res.end("nodejs_ok");
  if(target.target == 2){
    req.io.emit("message2", "hahaha")
    console.log("haha")
  }
})

router.post('/posttest19', function(req, res, next){
  var target = req.body;
  target = JSON.stringify(target);
  target = target.substring(2, target.length);
  target = target.substring(0, target.length-5);
  target = target.replace(/\\/g,'');
  target = JSON.parse(target);
  // var target3 = JSON.parse(target2);
  console.log(target.target);
  console.log(req.body);
  // console.log(target.user_ip);
  req.io.emit("message19", target.target);
  res.end("nodejs_ok");
  if(target.target == 2){
    req.io.emit("message2", "hahaha")
    console.log("haha")
  }
})

router.post('/posttest20', function(req, res, next){
  var target = req.body;
  target = JSON.stringify(target);
  target = target.substring(2, target.length);
  target = target.substring(0, target.length-5);
  target = target.replace(/\\/g,'');
  target = JSON.parse(target);
  // var target3 = JSON.parse(target2);
  console.log(target.target);
  console.log(req.body);
  // console.log(target.user_ip);
  req.io.emit("message20", target.target);
  res.end("nodejs_ok");
  if(target.target == 2){
    req.io.emit("message2", "hahaha")
    console.log("haha")
  }
})



module.exports = router;
