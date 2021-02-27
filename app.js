const express= require('express');
const mongoose= require('mongoose');
const Del= require('./models/delivery');

const app=express();

app.set('view engine', 'ejs');

const dbURI= "mongodb+srv://BITSPhoenix:@BITS123@cluster0.e8jal.mongodb.net/test?retryWrites=true&w=majority";
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