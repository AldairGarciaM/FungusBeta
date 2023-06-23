const pass = require ('passport');
const localpass = require ('passport-local').Strategy;

const usuario = require('../models/Users');

pass.use(new localpass({
    usernameField: 'email',
    passwordField: 'contrasena'
}, async (email, password, done) => {
    const user = await usuario.findOne({email: email});
    if(!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
    } else {
        const match = await user.matchPassword(password);
        if(match) {
            return done(null, user);
        }else{
            return done(null, false, {message: 'Contraseña incorrecta'});
        }
    }
}));

pass.serializeUser((user, done) => {
    done(null, user.id);
});

pass.deserializeUser((id, done) => {
    usuario.findById(id, (err,user) => {
        done(err, user);
    });
});