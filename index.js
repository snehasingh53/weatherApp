const http = require("http");
const fs = require("fs");
const axios = require("axios");

const homeFile = fs.readFileSync("home.html", "utf-8");


const replaceVal = (tempVal, orgVal) => {
   
    const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(2);
  
    let temperature = tempVal.replace("{%tempval%}", kelvinToCelsius(orgVal.main.temp));
    
    temperature = temperature.replace("{%location%}", orgVal.name || '');
    temperature = temperature.replace("{%country%}", orgVal.sys.country || '');
    temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main || '');
  
    return temperature;
  };
  
  
  
  

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    axios.get("https://api.openweathermap.org/data/2.5/weather?q=lucknow&appid=d1d16e583e191d199f7d324e9b4ba3db")
      .then((response) => {
        const objdata = response.data;
        const arrData = [objdata];
        const realTimeData = arrData.map((val) => replaceVal(homeFile, val)).join("");
        res.write(realTimeData);
        res.end();
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
        res.end("Error fetching weather data");
      });
  } else {
    res.end("File not found");
  }
});

server.listen(1000, "127.0.0.1", () => {
  console.log("Server is running on http://127.0.0.1:1000");
});
