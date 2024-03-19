import express from 'express';
import path from 'path';

import { getGlobals } from 'common-es'
const { __dirname, __filename } = getGlobals(import.meta.url)


const app = express();
const port = 4000;


//create the middleware 
const Time = (req, res, next) => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay(); 
    const hourOfDay = currentDate.getHours();

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
        next(); 
    } else {
        res.send('Sorry, our website is only available during working hours (Monday to Friday, from 8 to 9:59 ).');
    }
};

app.use(express.static(path.join(__dirname, 'public')));
app.use(Time);


// i set the template engine as ejs and the views directory with the path.join method

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/services', (req, res) => {
    res.render('services')
});

app.get('/contact', (req, res) => {
    res.render('contact')
});

app.listen(port, ()=> {
    console.log(`server is running on http://localhost:${port}`)
});