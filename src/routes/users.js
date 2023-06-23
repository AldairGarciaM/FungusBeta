const express = require('express');
const router = express.Router();

const User = require('../models/Users');
const passport = require('passport');
const { isAuthenticated } = require('../helpers/navegacion');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.get('/users/inicio', isAuthenticated ,(req, res) => {
    res.render('users/Inicio');
})

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/users/inicio',
    failureRedirect:  '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

//crear nuevo usuario
router.post('/users/signup', async (req, res) =>{
    const {nombre, 
        apellidos, 
        email, 
        contrasena, 
        confirm_pass, 
        aceptar } = req.body;
    const error = [];

    if(nombre.length <=0 ){
        error.push({text: 'Favor de escribir su nombre'});
    }
    if(apellidos.length <=0 ){
        error.push({text: 'Favor de escribir su apellido'});
    }
    if(email.length <=0 ){
        error.push({text: 'Favor de ingresar un correo'});
    }
    if(contrasena.length <=0 ){
        error.push({text: 'Favor de escribir una contraseña'});
    }
    if(confirm_pass.length <=0 ){
        error.push({text: 'Vuelva a escribir la contraseña'});
    }
    if(!aceptar){
        error.push({text: 'Acepta los terminos'});
    }
    if(contrasena != confirm_pass) {
        error.push({text: 'La contraseña no coinciden'});
    }
    if(contrasena.length < 4){
        error.push({text: 'La contraseña debe ser mayor de 4 caracteres'});
    }
    if(error.length > 0){
        res.render('users/signup', {
            error, 
            nombre, 
            apellidos, 
            email, 
            contrasena, 
            confirm_pass, 
            aceptar
        });
    }else{
        const emailUser  = await User.findOne({email: email});
        if(emailUser){
            req.flash('error_msg', 'Este correo ya esta en uso');
            res.redirect('/users/signup');
        }
        const newUser = new User ({
           nombre, 
           apellidos, 
           email, 
           contrasena});
        newUser.contrasena = await newUser.encryptPassword(contrasena);
        await newUser.save();
        req.flash('succes_msg', 'Te registraste correctamente');
        res.redirect('/users/signin');
    }
});

router.get('/users/log', (req, res) => {
    req.logOut();
    res.redirect('/');
});


module.exports = router;