let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const session = require('express-session');

//CHAT///////////////////////////////////////////////////////////////////////////////
const {Server} = require("socket.io");
const http = require("http");
/////////////////////////////////////////////////////////////////////////////////////

let indexRouter = require('./routes/index');
let loginRouter = require('./routes/login');
let registroRouter = require('./routes/registro'); //RUTAAAAAAAAAAAAAAA
let restrictedRouter = require('./routes/restricted');

/////////////////////////////////////////////////
let chatRouter = require('./routes/chat'); //CHAAAT
////////////////////////////////////////////////////

let app = express();

//CHAT/////////////////////////////////////////////////////////////////////////////
const httpServer = http.createServer(app);
const io = new Server(httpServer);
io.on("connection", (socket) => {
  console.log("A new user has connected");
  socket.on("chat", (msg) => {
    console.log(msg);
    io.emit("chat", msg);
  });
  socket.on("disconnect",()=>{
    console.log("A user has disconnected");
  });
});
////////////////////////////////////////////////////////////////////////////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'El secreto que queramos nosotros'
}));

app.use(function(req, res, next){
  let error = req.session.error;
  let message = req.session.message;
  delete req.session.error;
  delete req.session.message;
  res.locals.error = "";
  res.locals.message = "";
  if (error) res.locals.error = `<p>${error}</p>`;
  if (message) res.locals.message = `<p>${message}</p>`;
  next();
});

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/registro', restrict_registrar,registroRouter); //RUTAAAAAAAAAAAAAAAAAAAAAAa
app.use('/restricted', restrict, restrictedRouter);
app.use('/logout', function(req, res, next){
  req.session.destroy(function(){
    res.redirect("/");
  })
})

////////////////////////////////7
app.use('/chat',restrict,chatRouter); //SOLO PUEDO ACCEDER AL CHAT EN EL CASO DE QUE HAGA LOGIN O DE QUE ME REGISTRE YA QUE ES LA ÚNICA FORMA DE OBTENER EL "req.session.user"
/////////////////////////////////////

function restrict(req, res, next){
  if(req.session.user){
    next();
  } else {
    req.session.error = "Unauthorized access";
    res.redirect("/login");
  }
}

//En caso de que el usuario esté logeado no pueda volver a acceder a la pestña de registro
function restrict_registrar(req, res, next){ 
  if(req.session.user){
    res.redirect("/");
  } else {
    next();
  }
}

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

///////////////////////////////////////////////////////7
module.exports = {app, httpServer};
//////////////////////////////////////////////////////

//module.exports = app;
