const database = require('mongoose');

database.connect('mongodb://localhost/db-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log('La base de datos esta conectada'))
.catch(err => console.error(err));