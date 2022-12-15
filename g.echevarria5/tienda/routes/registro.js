var express = require('express');
const { use } = require('.');
var router = express.Router();
const users = require('../users'); //hace referencia al users.js

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registro', { title: 'Register', user: req.session.user}); /* registro y titulo */
});

router.post('/', function(req, res, next){
    let user = req.body.user;
    let password = req.body.pass;
    let rep_password = req.body.rep_pass;
    let longitud_pass = password.length;
    let longitud_user = user.length;
    console.log(longitud_pass);

    if(users[user]){
        req.session.error = "This Username is in use!";
        res.redirect("/registro");
    }
    
    else if (1 <= longitud_user && 8 <= longitud_pass && password == rep_password){ //&& users.registro_completo(user, password,rep_password)==true){
        console.log("ok");
        users.register(user,password, function(){
            req.session.user = users[user]; /* para iniciar sesión automáticamente tras el registro */
            req.session.message = "Register CORRECT!";
            res.redirect("/restricted");
        });
    }

    else{
        req.session.error = "ERROR, Asegurese de que las contraseñas coinciden y que su longitud es igual o mayor a 8";
        res.redirect("/registro"); /* para que salga el mensaje es importante tener una res */
    }
});

module.exports = router;
