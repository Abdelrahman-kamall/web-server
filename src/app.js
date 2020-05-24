const path = require('path')
const express = require("express")
const hbs = require("hbs")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
/**/ 
const app = express()
/**/
const server_dir = /**/express.static(path.join(__dirname,'..','/public'))
const views_dir = path.join(__dirname,"../temps/views")
const partials_dir = path.join(__dirname,"../temps/partials")
/**/
app.use(server_dir)

app.set("view engine","hbs")
app.set("views",views_dir)
hbs.registerPartials(partials_dir)

app.get('',(req,res)=>{
    res.render("index",{
        title:"Weather",
        name:"KAMAL"
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
    geocode.geo_code(req.query.address,res, geocode_callback)

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


const forecast_callback = (error,body,res,address,location)=>{
    if(error){
        errormsg ="something went wrong , error code : "+error.code
         res.send({errormsg})
    }else if(body.error){
        errormsg ="bad request , error message : "+body.error
         res.send({errormsg})
    }else{
        console.log()
        forcast = body.daily.summary+" It's currently "+ body.currently.temperature +" and there is "
        + body.currently.precipProbability +" chance to rain"
        res.send({
            forcast,
            location,
            address

        })
    
    }
}




const geocode_callback = (error,body,res,addr)=>{
    if(error){
        errormsg ="something went wrong , error code : "+error.code
        res.send({errormsg})
    }else if(body.error){
        errormsg ="bad request , error message : "+body.error
        res.send({errormsg})
    }else if(body.features.length === 0){
        errormsg ="unable to find location !"
        res.send({errormsg})
    }else{
        //console.log("the location u r searching for : "+body.features[0].place_name)
        //console.log("the location coordinates : " + body.features[0].center)
        forecast(body.features[0].center[1],body.features[0].center[0],res
            ,addr,body.features[0].place_name,forecast_callback)
    }
    
}



