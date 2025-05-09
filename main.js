let moodColors;

fetch("moodColors.json")
  .then(response => response.json())
  .then(data => moodColors = data)
  .catch(err => console.error("Failed to load mood colors JSON", err));

async function getDivination() {
  const city = document.getElementById("cityInput").value;
  const mood = document.getElementById("moodSelect").value;
  const apiKey = "6f99633cf0b894c5e366fedf705b6c67"; // your real API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const weather = data.weather[0].main;
    const description = data.weather[0].description;
    const temp = data.main.temp;

    const colors = moodColors[mood];
    const suggestion = getSuggestion(weather, mood);
    const perfume = getPerfumeSuggestion(mood);
    const explanation = getColorExplanation(mood);
    const comment = getWeatherComment(weather.toLowerCase());

    document.getElementById("result").innerHTML = `
      <h2>Today's Weather</h2>
      <p>${weather} – ${description}, ${temp.toFixed(1)}°C</p>
      <h2>Today's Colors</h2>
      <p>${colors.join(", ")}</p>
      <p><em>Why these colors?</em> ${explanation}</p>
      <p><em>Perfect for ${weather} weather!</em></p>

      <h3>Suggestion</h3>
      <p>${suggestion}</p>
      <h3>Recommended Perfume</h3>
      <p>${perfume}</p>
    `;
    document.getElementById("result").style.display = "block";
  } catch (error) {
    alert("Failed to fetch weather data. Try another city.");
  }
}

function getSuggestion(weather, mood) {
  if (mood === "sad" && weather === "Rain") {
    return "Soft layers and muted tones will support your calm energy.";
  }
  if (mood === "happy" && weather === "Clear") {
    return "Go bold with bright colors and breezy fabrics.";
  }
  if (mood === "anxious") {
    return "Wear gentle fabrics and calming shades to ease your mind.";
  }
  return "Trust your instinct. Your aura knows what it needs.";
}

function getPerfumeSuggestion(mood) {
  switch (mood) {
    case "happy":
      return "Citrus or floral notes like bergamot, jasmine, or neroli.";
    case "sad":
      return "Woody or musky tones like sandalwood, amber, or patchouli.";
    case "anxious":
      return "Lavender, chamomile, or green tea for a calming effect.";
    default:
      return "Choose something that makes you feel grounded.";
  }
}

function getColorExplanation(mood) {
  switch (mood) {
    case "happy":
      return "These colors amplify joy, brightness, and outward energy.";
    case "sad":
      return "Muted tones bring stability and encourage gentle reflection.";
    case "anxious":
      return "Soft, cool colors can help quiet the mind and body.";
    default:
      return "These tones align with your current emotional flow.";
  }
}

function getWeatherComment(weather) {
    switch (weather.toLowerCase()) {
      case "clear": 
        return "It's sunny—perfect for light and bright outfits!";
      case "clouds": 
        return "Cloudy skies? Great for layering and a cozy vibe.";
      case "rain": 
        return "Rainy day—consider something waterproof or with a hood!";
      case "snow": 
        return "Snowy weather calls for thick coats and warm accessories.";
      case "thunderstorm": 
        return "Stay stylish indoors—rituals count even at home.";
      default: 
        return "A great day to express yourself through what you wear.";
    }
  }
  
