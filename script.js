const btn = document.getElementById("search-btn");
const input = document.getElementById("input-city");
let cityName = document.getElementById("cityName");
let citytime = document.getElementById("cityTime");
let citytemp = document.getElementById("cityTemp");

async function getData(cityname) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=00c51841a9b642358ca210336251702&q=${cityname}&aqi=yes`);
        
        if (!response.ok) {
            throw new Error("City not found or invalid input");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null; // Return null if an error occurs
    }
}

btn.addEventListener('click', async () => {
    const value = input.value.trim();
    
    if (value === "") {
        alert("Please enter a city name!");
        return;
    }

    const result = await getData(value);

    if (result) {
        cityName.innerText = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
        citytime.innerText = result.location.localtime;
        citytemp.innerText = `${result.current.temp_c}°C`;
    } else {
        cityName.innerText = "Invalid city. Please try again.";
        citytime.innerText = "";
        citytemp.innerText = "";
    }
});
