const input = document.querySelector(".Container input");
const searchBtn = document.querySelector(".fa-magnifying-glass");
const mainImage = document.querySelector(".Weather-Data .image img");
const temperature = document.querySelector(".Weather-Data .temperature p");
const city = document.querySelector(".Weather-Data .cityName");
const status = document.querySelector(".Weather-Data .status");
const humidity = document.querySelector(
  ".Weather-Data .about .aboutHumidity .humidity-magnitude"
);
const wind = document.querySelector(
  ".Weather-Data .about .aboutWind .wind-magnitude"
);
const Location = document.querySelector(".Container .Location");
const weatherBody = document.querySelector(".Container .Weather-Data");

const changeImage = (data) => {
  if (data.weather[0].main.toLowerCase() === "mist") {
    mainImage.src = "mist.png";
  } else if (data.weather[0].main.toLowerCase() === "clear") {
    mainImage.src = "clear.png";
  } else if (data.weather[0].main.toLowerCase() === "clouds") {
    mainImage.src = "cloud.png";
  } else if (data.weather[0].main.toLowerCase() === "rain") {
    mainImage.src = "rain.png";
  } else {
    mainImage.src = "clear.png";
  }
};
async function updateWeather(cityName) {
  const APIkey = `5357bda5361412c0da21dff43eb6933a`;
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`;
  let promise = await fetch(URL);
  const data = await promise.json();
  console.log(data);
  if (data.cod == "404") {
    const errorPara = document.createElement("p")
    errorPara.innerText = "OOPs! Some Error Occured."
    errorPara.classList.add("ErrorPara")
    Location.after(errorPara)
    const errorImage = document.createElement("img");
    errorImage.src = "404.png";
    Location.after(errorImage);
    errorImage.classList.add("ErrorImg");
    
  } else {
    weatherBody.classList.remove("Weather-Body");
    city.innerText = input.value;
    temperature.innerText = (data.main.temp - 273.12).toFixed(1);
    humidity.innerText = data.main.humidity + "%";
    wind.innerText = data.wind.speed + "Km/h";
    status.innerText = data.weather[0].main;
    changeImage(data);
  }
}

searchBtn.addEventListener("click", () => {
  updateWeather(input.value);
});
