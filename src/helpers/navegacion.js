//Funcion para no poder navegar por las paginas si no estas registrado

const nav = {};

nav.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'No haz iniciado sesion.');
    res.redirect('/users/signin');
};

module.exports = nav;