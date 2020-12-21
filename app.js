const express = require('express');
const mongoose = require('mongoose');
const validURL = require('valid-url');
const Model = require('./model/model');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/Links',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));

app.use('/',express.static('public'));

app.get('/',(req,res)=>{
    Model.find().then(links =>{
        res.render('index',{data:links});
    }).catch(err =>res.status(501).send('No URL Saved Yet'+err));
});

app.get('/:shortlink',(req,res)=>{
    Model.findOne({shortURL:req.params.shortlink})
    .then(link =>{
        link.totalClicks++;
        link.save();
        res.redirect(link.fullURL);
    })
    .catch(err =>{
        res.status(404).send({error:err,msg:'InValid URL'});
    });
});

app.get('/links/clear',(req,res)=>{
    Model.deleteMany({}).then(()=>{
        res.redirect('/');
    }).catch(err =>{
        res.status(501).send('cant delete links right now try after some time',err);
    });
});

app.post('/url', async (req,res)=>{
   if(validURL.isUri(req.body.URL)){
        let isPresent= await Model.findOne({fullURL:req.body.URL});
       if( isPresent !== null){
            res.status(501).send('URL already present');
       }else{
            let stored = await Model.create({fullURL:req.body.URL});
            if(stored)
                res.redirect('/');
            else
                res.status(501).send('error in adding URL'+err);
        }
    }else{
        res.status(404).send({error:'Invalid URL'});
    }
});

app.listen(PORT,function(){
    console.log(`listenning for requests on port ${PORT}`);
});