const asyncRequest = require("async-request");

const getWeather = async (location) => {
  const url = `http://api.weatherstack.com/current?access_key=305e1798dca3539e43c055de1046f334&query=${location}`;
  try {
    const res = await asyncRequest(url); // await khi nao lam xong thi moi gan cho res , async phai di chung voi await
    // res tra ve header m body --> thong tin can tim nam o body , body(string)
    const data = JSON.parse(res.body);
    const weather = {
      isSuccess:true,
      region: data.location.region,
      country: data.location.country,
      temperature: data.current.temperature,
      wind_speed: data.current.wind_speed,
      precip: data.current.precip,
      cloudcover: data.current.cloudcover,
    };
    return weather;
  } catch (error) {
    return {
        isSuccess:false,
        error,
    }
  }
};

// getWeather("Tokyo");
// Promise la loi hua --> mat thoi gian de doi 


const express=require('express')
const path=require('path')
const app=express();
const pathPublic=path.join(__dirname,"./public") // dirname la duong dan tuyet doi chay den file dang ccode (app.js) --> + /public 
app.use(express.static(pathPublic))
app.set("view engine","hbs")
app.get("/", async (req,res)=>{
    const params=req.query
    const location=params.address
    const weather =await getWeather(location)
    console.log(weather)
    if(location)
    {
        res.render("weather",{
            status:true,
            region:weather.region,
            country: weather.country,
            temperature: weather.temperature,
            wind_speed: weather.wind_speed,
            precip: weather.precip,
            cloudcover: weather.cloudcover,
    
        }) // de render ra man hinh , can truyen du lieu cho hbs
    }
    else{
        res.render("weather",{
            status:false,
    
        }) // de render ra man hinh , can truyen du lieu cho hbs
    }

})



app.listen(7000,()=>{
    console.log(`http://localhost:7000/`)
})