const express= require('express');
const mongoose= require('mongoose');
//const passport = require('passport');
const Del= require('./models/delivery');
/*const cookieSession= require('cookie-session');
require('./passport-setup');*/

const app=express();

app.set('view engine', 'ejs');

//The following comments are for interfacing with google. Do not bother reading if not interested
/*app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/failed', (req, res)=> res,send('You failed to log in!'));
app.get('/good', (req, res)=> res.send('Welcome mr ${req.user.email}!'));

app.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

app.get('google/callback', passport.authenticate('google', {failureRedirect: '/failed'}),
(req, res)=>{
    res.redirect('/good');
});*/

const dbURI= "mongodb+srv://<userID>:<password>@cluster0.e8jal.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology:true})
.then((result)=>app.listen('8080'))
.catch((err)=> console.log(err));

//middleware
app.use(express.urlencoded({extended: true}));

app.post('/past-orders', (req,res)=>{
    const del= new Del(req.body);

    del.save()
    .then((result)=>{
        res.redirect('/past-orders');
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.get('/', (req, res)=>{
    res.render('sign-in', {title: 'Sign-in'});
});

app.get('/home', (req, res)=>{
    res.render('index', {title: 'Homepage'});
});

app.get('/delivery-info', (req, res)=>{
    res.render('hostel', {title: 'Checkout'});
})

app.get('/items',(req,res)=>{
    res.render('items', {title: 'Contents'});
});
app.get('/past-orders', (req, res)=>{
    Del.find()
    .then((result)=>{
        res.render('past-orders', {title: 'Past Orders', del: result});
    })
    .catch((err)=>console.log(err));
});

app.use((req, res)=>{
    res.status(404).render('404', {title: 404});
});
