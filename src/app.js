const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode= require('./utils/geocode')
const forecast=require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public/'))
console.log();

const app=express()

const pub_dir=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
console.log(pub_dir+' '+viewsPath+' '+partialsPath)

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(pub_dir))
app.get('',(req,res)=>{
    res.render('index',{title:'Weather App',name:'Sample Name'})
})

app.get('/about',(req,res)=>{
    res.render('about',{name:'Sample Name',title:'About'})
})

app.get('',(req,res)=>{
res.send('<h1>Hello Express</h1>')
})

app.get('/help',(req,res)=>{
    res.render('help',{message:'Here is the message',title:'Help',name:'Here Name'})
})

app.get('/weather',(req,res)=>{
    //res.render('weather',{title:'weather',name:'Here Name'})
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
   const location=req.query.address
    geocode(location,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
       
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }
        
            res.send({
                forecast:forecastdata.status,
                location,
                address:req.query.address
            })
           // console.log(chalk.blue.bold(location))
            //console.log(forecastdata.status)
          })
    })

    // console.log(req.query.address)
    // res.send({
    //     forecast:'It is snowing',
    //     location:'Philadelphia',
    //     address: req.query.address
    // })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'Andrew',
        errorMessage:'Page not found'
    })
})
app.get('/about',(req,res)=>{
    res.send('<h1>About</h1>')
})



//app.com
//app.com/help
//app.com/about
app.get('*',(req,res)=>{
res.send('<h1>404 Page</h1>')
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})
