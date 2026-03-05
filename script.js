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