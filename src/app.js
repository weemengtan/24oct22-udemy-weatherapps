const path = require('path') //core node modules, dont need to import lib

const express = require('express')
const hbs = require('hbs')

const app = express()
//console.log(__dirname)
//console.log(__filename)

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')//move up current directory -> public directory
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views locations
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

//routes:
//app.com
app.get('', (req, res) =>{
//    res.send('hello express!')
//    res.send('<h2>hello express!</h2>')
    res.render('index', {
        title:'Main Weather Apps',
        name:'weemeng tan'
    })
})

//app.com/about
app.get('/about', (req, res) =>{
//    res.send('this is a brand new movement to revolutionise express')
    res.send({
        name: 'weemeng',
        date_built: '22 oct 22',
        version_built: 'v2.3'
    })
})

//app.com/help -> using static help.html to serve instead :)
 app.get('/help', (req, res) =>{
//     res.send('lost? fear not! you are all good')
    res.render('help', {
        title:'Help Render',
        name:'Best Helper Wee'
    })
 })

app.get('/products', (req, res)=>{
    if (!req.query.search) {
        return res.send({
            Error: 'please provide search value'})
    }

    console.log(req.query)
    res.send({
        products: req.query.search
    })
})

app.get('/help/*', (req,res)=>{
    res.send('Oops i cannot find thid Help article you looking for...')
})

app.get('*', (req,res)=>{
    res.send('Ah hah - i share my error 404 page with you...')
})

app.listen(3000, ()=>{
    console.log('app server started on port 3000')
})
