const apiKey = '61fcd692d42e3a1208d57073d0523494'; // Tu API Key
const input = document.getElementById('city-input');
const suggestionsBox = document.getElementById('suggestions');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');

// Lista de ciudades para sugerencias (puedes expandir esta lista)
const cities = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Zaragoza', 'Malaga', 'Granada', 'Alicante', 'Córdoba'];

// Evento para detectar cambios en el input y mostrar sugerencias
input.addEventListener('input', function() {
  const query = input.value.trim().toLowerCase();
  clearSuggestions();
  
  if (query.length > 0) {
    const filteredCities = cities.filter(city => city.toLowerCase().startsWith(query));
    filteredCities.forEach(city => {
      const suggestionItem = document.createElement('div');
      suggestionItem.classList.add('suggestion-item');
      suggestionItem.textContent = city;
      suggestionItem.onclick = () => {
        input.value = city;
        clearSuggestions();
        getWeather(city);  // Obtener el clima directamente al seleccionar la sugerencia
      };
      suggestionsBox.appendChild(suggestionItem);
    });
  }
});

// Obtener y mostrar el clima al hacer clic en el botón de búsqueda
searchBtn.addEventListener('click', function() {
  const city = input.value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert('Por favor, ingresa una ciudad');
  }
});

// Función para obtener el clima desde la API
function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(`Fetching weather data from: ${url}`); // Depuración: URL de solicitud

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Ciudad no encontrada'); // Manejo específico para ciudad no encontrada
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      weatherInfo.innerHTML = `<p>${error.message}</p>`;
    });
}

// Mostrar el clima en la interfaz
function displayWeather(data) {
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;
  const humidity = data.main.humidity;
  const windSpeed = Math.round(data.wind.speed);

  weatherInfo.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
    <p><strong>Temperatura:</strong> ${temp}°C</p>
    <p><strong>Clima:</strong> ${description}</p>
    <p><strong>Humedad:</strong> ${humidity}%</p>
    <p><strong>Velocidad del Viento:</strong> ${windSpeed} m/s</p>
  `;
}

// Limpiar las sugerencias
function clearSuggestions() {
  suggestionsBox.innerHTML = '';
}
