const express = require("express");
const https = require("https");
const app = express();
const bodyParse = require("body-parser");
const { log } = require("console");
app.use(bodyParse.urlencoded({extended:true}))

app.get("/", (req,res) =>{
    res.sendFile(__dirname + "/index.html");
});
app.post("/" ,(req,res)=>{
    //console.log(req.body);
    var city = req.body.cityName
    var units = req.body.units
    //console.log(city);
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+units+"&appid=445949ea70be3dcd94334a59a25b865c";
    https.get(url,(response)=>{
        console.log(response.statusCode);
        response.on("data",(data)=>{
            const weatherData = JSON.parse(data)
            //console.log(weatherData);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imgurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The Weather look like :"+ description + "</p>")
            res.write("<h1>The temp in "+city+ " is: "+ temp + "</h1>")
            res.write("<img src="+imgurl+" />")
            res.send()
        })

    })

})

app.listen(3400,() =>{
    console.log("Server on Port 3400");
})