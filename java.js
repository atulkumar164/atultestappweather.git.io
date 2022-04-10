const timeE1= document.getElementById("time");
const dateE1 = document.getElementById("date");
const currentweatherItemsE1= document.getElementById("Currnt-weather-iteams");
const timezone = document.getElementById("time-zone");
const countryE1= document.getElementById("counrty")
const weatherForcastE1 = document.getElementById("weather-forcast");
const CurrentTempE1 = document.getElementById("currnt-temp");


const days = ['Sunday','Monday','Tuesday','Wedensday','Thursday','Friday','Saturday'];
const months =['Jan','Feb','March','Apr','May','June','July','August','Sep','Oct','Nov','Dec'];

 const API_KEY = `5b5f7422e81d131201af60a877767278`;
setInterval(()=>{
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeE1.innerHTML = (hoursIn12HrFormat<10 ? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':'+ (minutes <10 ? '0'+minutes : minutes)+' '+`<span id = 'am-pm">${ampm}</span>`
     dateE1.innerHTML= days[day] +',' + date +''+ months[month]

},1000);
getWeatherData()
function showWeatherData (){
    navigator.geolocation.getCurrentPosition((success ) => {
        console.log(success);

        let {latitude , longitude} = success.coords;
         fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${API_KEY}`).then(res => res.json()).then(data =>{
             console.log(data);
             showWeatherData(data);
         })
        })
}
function showWheatherData (data){
    let {humidity, pressure, sunrise,sunset,wind_speed} =data.current;

    timezone.innerHTML =data.timezone;
    countryE1.innerHTML = data.lat +'N'+ data.lon+'E'

    currentweatherItemsE1.innerHTML=
    ` <div class="weathers-iteams">
    <div>Humidity</div>
    <div>${humidity}</div>
 </div>
<div class="weathers-iteams">
 <div>Preessure</div>
 <div>${pressure}</div>
</div>
<div class="weathers-iteams">
 <div>wind speed</div>
 <div>${wind_speed}</div>
</div>
<div class="weathers-iteams">
 <div>sunrise</div>
 <div>${window.moment(sunrise*1000).format('HH:mm')}</div>
</div>
<div class="weathers-iteams">
 <div>sunset</div>
 <div>${window.moment(sunset*1000).format('HH:mm')}</div>
</div>

`;
 let otherDayForcast = ''
 data.daily.forEach((day,idx) => {
    if(idx == 0){
        CurrentTempE1.innerHTML=` <img src="https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_18-128.png" alt="weather icon" class="w-icon">
        <div class="other">
            <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
            <div class="temp">Night ${day.temp.night}&#176;c</div>
            <div class="temp">Day ${day.temp}&#176;c</div>  
        </div>`
    }else{
        otherDayForcast +=`   <div class="weather-forcast-iteams">
        <div class="day">${window.moment(day.dt*1000).format('ddd')}</div> 
        <img src="https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_18-128.png" alt="weather icon" class="w-icon">
        <div class="temp">Night ${day.temp.night}&#176;c</div>
        <div class="temp">Day ${day.temp.day}&#176;c</div>
    </div>`
    } 
 });

    
weatherForcastE1.innerHTML= otherDayForcast;
    
}