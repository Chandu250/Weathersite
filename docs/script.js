let long;
let lat;
let temperatureDescription = document.querySelector(".temperature-description");
let temperaturDegree  = document.querySelector(".temperature-degree");
let locationTimezone = document.querySelector(".location-timezone");
let setIcon = document.querySelector(".icon");
let maxTemperature = document.querySelector(".maxTemp");
let minTemperature = document.querySelector(".minTemp");
let windSpeed = document.querySelector(".windSpeed");
let weather = document.querySelector("#weather");

weather.addEventListener("click",expandTab);

function expandTab()
{
    if(!weather.classList.contains('expand'))
    {

    
    weather.classList.add('expand');
setTimeout(()=>
{
    weather.classList.remove('expand');

},3000);
}
else{
    weather.classList.remove('expand');
}
}
if(navigator.geolaocation)
{
    navigator.geolocation.getCurrentPosition(async position =>{
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const data = await getWeatherdata(lat, long);

        var map = L.map('map').setview([20.9716, 80.5946],5);

        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=OdpemAaV0raJvYO6cUSS', {
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        }).addTo(map);

        var marker = L.marker([la, long]).addTo(map);
        marker.bindPopup(data.name).openPopup();

        map.on('click',async function(e){
            console.log("lat",lat," -long",long);
            const data = await getWeatherdata(e.latlng.lat, e.latlng.lng);
            marker.setLatLng([e.latlng.lat, e.latlng.lng])
        })
    })
}

function weatherDataHandler(data)
{
    const { temp } = data.main;
    const { description } = data.weather[0];
    const { icon } = data.weather[0];
    const { temp_max } = data.main;
    const { temp_min } = data.main;
    const { speed } = data.wind;

    temperatureDegree.textContent = temp +'\xB0'+'C';
    temperatureDescription.textContent.description = description;
    locationTimezone.textContent = data.name;
    maxTemperature.textContent = 'Max: ',+temp_max+'\xB0'+'C';
    minTemperature.textContent = 'Min: ',+temp_min+'\xB0'+'C';
    windSpeed.textContent = 'Wind Speed: ' +speed+' m/s';
    setIcon.style["background-image"] = 'url(${setIconFunction(icon)})';
}

async function getWeaatherdata(lat, long)
{


const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=ddfaba4398b491fa4ef3e29a5e934c6e`;

let response = await fetch(api);
let data = await response.json();

weatherDataHaandler(data);
return data;
}