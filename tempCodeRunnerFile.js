const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempval%}", (orgVal.main && orgVal.main.temp) ? (orgVal.main.temp - 273.15).toFixed(2) : '');
    temperature = temperature.replace("{%tempmin%}", (orgVal.main && orgVal.main.temp_min) ? (orgVal.main.temp_min - 273.15).toFixed(2) : '');
    temperature = temperature.replace("{%tempmax%}", (orgVal.main && orgVal.main.temp_max) ? (orgVal.main.temp_max - 273.15).toFixed(2) : '');
    temperature = temperature.replace("{%location%}", orgVal.name || '');
    temperature = temperature.replace("{%country%}", orgVal.sys ? orgVal.sys.country || '' : '');
    temperature = temperature.replace("{%tempstatus%}", orgVal.weather && orgVal.weather[0] ? orgVal.weather[0].main || '' : '');
  
    return temperature;
  };