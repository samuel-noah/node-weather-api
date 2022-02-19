const { response } = require('express');
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const port = 3000;

//set the view engine to ejs
app.set('view engine', 'ejs');

//set express to use the expressLayouts middleware
app.use(expressLayouts);

//set the static folder
app.use(express.static('public'))

//fetching api using node fetch 
const fetch = require("node-fetch");

//set body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


//setting up dontenv 
require('dotenv').config();
let apiKey = process.env.API_KEY;


app.get('/', (req, res) => {
    
    res.render('index',{
        title: 'Home',
        layout: 'layouts/main'
    });
})

app.get('/about', (req, res) => {
    
    res.render('about',{
        title: 'About',
        layout: 'layouts/main'
    })
})


app.get('/form', (req, res) => {

        return  res.render('form',{
                title: 'Form',
                layout: 'layouts/main'
            })
    })


app.get('/api', async(req, res) => {
    
    //fetching data from the form
    const city = req.query;


    
    //processing data from api
        const weather = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city.city}&appid=${apiKey}`
        );
        let response = await weather.json();
        
        //processing data from api
        if(response.cod === '404'){
            return res.render('error',{
                title: 'Error',
                layout: 'layouts/main'
            })
        }else{
            res.render('api',{
            title: 'API',
            layout: 'layouts/main',
            response: response,
            city: city.city
            
        })

        }
})


app.listen(port, () => {
    console.log(`app is runing on port ${port}`);
})