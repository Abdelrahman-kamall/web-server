const path = require('path')
const express = require("express")
const hbs = require("hbs")


const app = express()

const server_dir = express.static(path.join(__dirname,'..','/public'))
const views_dir = path.join(__dirname,"../temps/views")
const partials_dir = path.join(__dirname,"../temps/partials")

app.use(server_dir)

app.set("view engine","hbs")
app.set("views",views_dir)
hbs.registerPartials(partials_dir)

app.get('',(req,res)=>{
    res.render("index",{
        title:"Weather"
    })
})
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"about me 2",
        name:"KAMAL"
    })
})

app.get('/help',(req,res)=>{
    res.render("help",{
        title:"Help",
        name:"KAMAL"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error:"you have to provide the address"
        })
        return console.log("error no address provided")
    }
    res.send([{ay7aga:'ay7aga',
    ay7agabardo:'ay7aga',
    address:req.query.address
}])
})

app.get('/help*',(req,res)=>{
    res.render("error",{
        title:"Help",
        name:"KAMAL",
        err:"this help section is not available"
    })
})

app.get('*',(req,res)=>{
    res.render("error",{
        title:"Help",
        name:"KAMAL",
        err:"this  page is not available"
    })
})

app.listen('3000',()=>{
    console.log('started yasta')
})