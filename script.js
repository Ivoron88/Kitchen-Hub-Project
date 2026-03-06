// Digital Clock and Date Engine Section

function updateClock() {
    //1. Grab our elements from the HTML
    const timeElement = document.getElementById('current-time');
    const dateElement = document.getElementById('current-date');
    // 2. Get the current date/time from the system
    const now = new Date();
    // 3. Format the Time (HH:MM)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}`;
    //4. Format the Date. This creates a nice string like "Tuesday, March 5"
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
}

// 5. Update the clock every second
setInterval(updateClock, 1000);
// 6. Call it once immediatly so there's no delay on page load
updateClock();


// Weather Engine section

const apiKey = '799f76505921f759d7d807cee65e3a67'; // Confirmed key
const city = 'Arlington';

async function updateWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
        
        // If the API is still 'waking up', this will stop the code from crashing
        if (!response.ok) {
            console.log("Weather API is still warming up... checking again in 10 mins.");
            return;
        }

        const data = await response.json();

        // 1. Target my HTML IDs
        const tempElement = document.getElementById('temp');
        const descElement = document.getElementById('description');
        const iconElement = document.getElementById('weather-icon');

        // 2. Inject Temperature
        tempElement.textContent = `${Math.round(data.main.temp)}°F`;

        // 3. Inject Description (Capitalized)
        const rawDesc = data.weather[0].description;
        descElement.textContent = rawDesc.charAt(0).toUpperCase() + rawDesc.slice(1);

        // 4. Update the Icon to the real-time version from OpenWeather
        const iconCode = data.weather[0].icon;
        iconElement.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    } catch (error) {
        console.error("Weather error:", error);
    }
}

// Check weather immediately, then every 30 minutes
updateWeather();
setInterval(updateWeather, 1800000);


/* --- The App Engine --- */

// 1. Select the buttons and overlay
const buttons = document.querySelectorAll('.app-btn, .tool-btn');
const overlay = document.getElementById('modal-overlay');
const closeBtn = document.getElementById('close-modal');

// 2. The "Open App" Logic
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const url = button.getAttribute('data-url');
        // We select the iframe inside here so we know it exists when clicked!
        const iframe = document.getElementById('app-frame'); 
        
        if (url && iframe) {
            console.log("Opening:", url);
            iframe.src = url;
            overlay.style.display = 'flex';
        } else {
            console.error("Error: URL or Iframe missing!");
        }
    });
});

// 3. The "Close App" Logic
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        const iframe = document.getElementById('app-frame');
        overlay.style.display = 'none';
        if (iframe) iframe.src = '';
    });
}

// 4. Click background to close
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        const iframe = document.getElementById('app-frame');
        overlay.style.display = 'none';
        if (iframe) iframe.src = '';
    }
});