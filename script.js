const weatherForm = document.querySelector(".header")
const inputVal = document.querySelector(".inputVal")
const card = document.querySelector(".card")



weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = inputVal.value;
    if(!city){
        displayError("Please enter a city.");
    } else{
        try{
            const weatherData = await getweatherData(city);
            displayWeatherInfo(weatherData);

        } catch(error){
            console.error(error);
            displayError(error);
        }
    }
});

async function getweatherData(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.API_KEY}&units=metric`;
    const response = await fetch(url);
    console.log(response);

    if(!response.ok){
        throw new error("Could not fetch weather data")
    }

    return await response.json()
};

function displayWeatherInfo(data){
    // console.log(data);
    const [{id, description}]= data.weather;
    const {name} = data;
    const {temp, humidity} = data.main;
    const {speed} = data.wind;

    card.textContent = "";
    card.style.display = "flex"

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const speedDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const emojiDisplay = document.createElement("p");

    cityDisplay.textContent = name;
    cityDisplay.classList.add("cityDisplay")
    card.appendChild(cityDisplay)

    tempDisplay.textContent = temp + "°C";
    tempDisplay.classList.add("tempDisplay");
    card.appendChild(tempDisplay);

    humidityDisplay.textContent = "Humidity: "+ humidity+" %";
    humidityDisplay.classList.add("humidityDsiplay");
    card.appendChild(humidityDisplay);

    speedDisplay.textContent = "Windspeed: "+ speed + " m/s";
    speedDisplay.classList.add("windspeed");
    card.appendChild(speedDisplay);

    descDisplay.textContent = description;
    descDisplay.classList.add("description");
    card.appendChild(descDisplay);

    emojiDisplay.textContent = getweatherEmoji(id);
    emojiDisplay.classList.add("emojidisplay");
    card.appendChild(emojiDisplay);


}

function getweatherEmoji(weatherId){
    switch(true) {
    case (weatherId >= 200 && weatherId <= 232):
        return " ⛈️ ";  // thunderstorm
    case (weatherId >= 300 && weatherId <= 321):
        return " 🌦️ ";  // drizzle
    case (weatherId >= 500 && weatherId <= 531):
        return " 🌧️ ";  // rain
    case (weatherId >= 600 && weatherId <= 622):
        return " ❄️ ";  // snow
    case (weatherId >= 700 && weatherId <= 781):
        return " 🌫️ ";  // atmosphere (fog, mist, haze)
    case (weatherId === 800):
        return " ☀️ ";  // clear sky
    case (weatherId >= 801 && weatherId <= 804):
        return " ☁️ ";  // clouds
    default:
        return " ❓ ";
}
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.innerText = message;
    errorDisplay.classList.add("displayError");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
};




