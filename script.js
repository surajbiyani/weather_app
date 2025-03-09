document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('Weather-info');
    const cityNameDisplay = document.getElementById('city-name');
    const tempratureDisplay = document.getElementById('temprature');
    const descriptionDisplay = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');

   const API_KEY = "1a8ad062fec83942634b40a9f54eeea1";
    getWeatherBtn.addEventListener('click' , async () => {
       const  city= cityInput.value.trim();
       if(!city) return ;


        try {
            const weatherData=await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }

    })

    async function fetchWeatherData(city)
    {
        // getst the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        //const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state_code},${country_code}&appid=${API_KEY}`
        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE",response);

        if (!response.ok){
            throw new Error("City Not Found");
            
        }
        const data = await response.json()
        return data;
    }

    function displayWeatherData(data)
    {
        console.log(data);
        const{name ,main , weather}= data;
        cityNameDisplay.textContent = name;

        tempratureDisplay.textContent = `Temprature : ${main.temp}`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;
        
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');



    }

    function showError()
    {
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden')
    }
})