const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login');
const notasRoutes = require('./routes/notas');

const app = express();
app.set('port', 4000);

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
    extname: '.hbs',
    }))
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'sqluser',
    password: 'password',
    port: 3306,
    database: 'notas'
}))

app.use(session({
secret: 'secret',
resave: true,
saveUninitialized:true

}));

app.listen(app.get('port'), () => {
    console.log('listening on port', app.get('port'));
});

app.use('/', notasRoutes);


app.use('/', loginRoutes);

app.get('/', (req, res) => {
    if(req.session.loggedin == true) {
        res.render('home', {name: req.session.email} );
            } else {
              res.redirect('/login'); 
            }
    
});