var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = express.Router();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const http = require('http')
const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server, { cors: { origin: "*" } }); // you can change the cors to your own domain

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use("/index", require("./routes/index")); // this file's express.Router() will have the req.io too.


// var localip = require('dns').lookup(require('os').hostname(), function (err, add, fam) {
//   console.log('addr: '+add);
// });


// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// // Connection URL
// const url = 'mongodb://127.0.0.1:27017';

// // Database Name
// const dbName = 'komablog';

// MongoClient.connect(url, function (err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   db.collection("posts", function (err, collection) {
//       collection.find({tag:"game"}).toArray(function (err, docs) {
//           assert.equal(null, err);
//           console.log("aaaaaaaaa")
//           console.log(docs);
//           console.log("bbbbbbbbbbbbbbbb")
//           console.log(docs[0].title);
//           client.close();
//       });
//   });
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





const PORT = process.env.PORT || 3000
server.listen(3000, (err) => {
    if(err){
        console.log("error aarrr")
    }
    console.log("The server is work on", "http://127.0.0.1:" + PORT)
})



// router.post('/posttest', function(req, res, next){
//   console.log(req.body);
//   // res.json({"target":"ok"});
//   res.end("nodejs_ok");
//   // socket.emit('message', "noooo")
//   io.on('connection', (socket) => {
//     // console.log("User connected " + socket.id);
//     socket.emit('message', "Hey it worked")
//     socket.on("message", (data) => {
//         // socket.broadcast.emit('message', data)
//         socket.emit('message', data)
//     })
//   })
// })


module.exports = app;