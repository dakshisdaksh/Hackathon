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

//Sandbox routes

app.get('/add',(req, res)=>{
    const del = new Del({
        block: 'B',
        number:'4',
        room:'4j',
        date:'6',
    });
    del.save()
    .then((result)=>res.send(result))
    .catch((err)=>console.log(err));
});

app.get('/all', (req, res)=>{
    const del= new Del.find();
    del.save()
    .then((result)=> res.send(result))
    .catch((err)=>console.log(err));
});
/*app.post('/past-orders', (req,res)=>{
    const del= new Del(req.body);

    del.save()
    .then((result)=>{
        res.redirect('/past-orders');
    })
    .catch((err)=>{
        console.log(err);
    });
});*/

app.get('/', (req, res)=>{
    res.render('index', {title: 'Homepage'});
});

app.get('/delivery-info', (req, res)=>{
    res.render('hostel', {title: 'Hostel Info'});
})

app.get('/items',(req,res)=>{
    res.render('items', {title: 'Contents'});
});
app.get('/past-orders', (req, res)=>{
    res.render('past-orders', {title: 'Past Orders'});
});

app.use((req, res)=>{
    res.status(404).render('404', {title: 404});
});