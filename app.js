const express= require('express');

const app=express();

app.set('view engine', 'ejs');

app.listen('8080');

app.get('/', (req, res)=>{
    res.render('index', {title: 'Homepage'});
});

app.get('/delivery-info', (req, res)=>{
    res.render('hostel', {title: 'Hostel Info'});
})

app.get('/items',(req,res)=>{
    res.render('items', {title: 'Contents'});
});

app.use((req, res)=>{
    res.status(404).render('404', {title: 404});
});