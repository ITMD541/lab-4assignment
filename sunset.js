// script.js

document.addEventListener('DOMContentLoaded', function () {
    if ('geolocation' in navigator) {
        document.getElementById('current-location').addEventListener('click', getCurrentLocation);
    } else {
        showError('Geolocation is not supported by your browser.');
    }

    document.getElementById('search-button').addEventListener('click', searchLocation);
});

function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getSunriseSunsetData(latitude, longitude);
}

function errorCallback(error) {
    showError(`Error getting current location: ${error.message}`);
}

function searchLocation() {
    const searchInput = document.getElementById('search-location').value;

    // Use Geocode API to get latitude and longitude for the searched location
    fetch(`https://geocode.xyz/${searchInput}?json=1`)
        .then(response => response.json())
        .then(data => {
            const latitude = data.latt;
            const longitude = data.longt;

            getSunriseSunsetData(latitude, longitude);
        })
        .catch(error => {
            showError(`Error searching for location: ${error.message}`);
        });
}

function getSunriseSunsetData(location) {
    // Use Geocode API to get latitude and longitude for the selected location
    fetch(`https://geocode.xyz/${location}?json=1`)
        .then(response => response.json())
        .then(data => {
            const latitude = data.latt;
            const longitude = data.longt;

            // Use Sunrise Sunset API to get data
            fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`)
                .then(response => response.json())
                .then(data => {
                    // Clear previous dashboard content
                    clearDashboard();

                    // Update the dashboard with the received data
                    updateDashboard(data);
                })
                .catch(error => {
                    showError(`Error fetching sunrise/sunset data: ${error.message}`);
                });
        })
        .catch(error => {
            showError(`Error searching for location: ${error.message}`);
        });
}


function clearDashboard() {
    const dashboardElement = document.getElementById('dashboard');
    dashboardElement.innerHTML = ''; // Clear previous content
}

function updateDashboard(data) {
    const dashboardContent = document.getElementById('dashboard-content');

    // Use the current date and time
    const currentDate = new Date();
    const todaySunrise = new Date(data.results.sunrise);
    const todaySunset = new Date(data.results.sunset);

    // Create and append new sections for each piece of information
    createDashboardSection('Sunrise Today', convertUtcToLocalTime(todaySunrise, 'America/New_York'));
    createDashboardSection('Sunset Today', convertUtcToLocalTime(todaySunset, 'America/New_York'));
    createDashboardSection('Dawn Today', convertUtcToLocalTime(new Date(data.results.civil_twilight_begin), 'America/New_York'));
    createDashboardSection('Dusk Today', convertUtcToLocalTime(new Date(data.results.civil_twilight_end), 'America/New_York'));
    createDashboardSection('Day Length Today', secondsToHms(data.results.day_length));
    createDashboardSection('Solar Noon Today', convertUtcToLocalTime(new Date(data.results.solar_noon), 'America/New_York'));
    createDashboardSection('Time Zone', 'America/New_York');
}
// Update the dashboard every minute (adjust the interval as needed)
setInterval(() => {
    const selectedLocation = document.getElementById('named-locations').value;
    if (selectedLocation) {
        getSunriseSunsetData(selectedLocation);
    }
}, 60000); // 60000 milliseconds = 1 minute


function createDashboardSection(title, content) {
    const dashboardElement = document.getElementById('dashboard');

    const section = document.createElement('div');
    section.classList.add('dashboard-section');
    section.innerHTML = `<h2>${title}</h2><p>${content}</p>`;

    // Append the new section at the beginning of the dashboard
    dashboardElement.insertBefore(section, dashboardElement.firstChild);
}

function convertUtcToLocalTime(utcTime, timeZone) {
    const localTime = new Date(utcTime);
    const options = { timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return localTime.toLocaleTimeString('en-US', options);
}



function secondsToHms(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);
    return `${h}h ${m}m ${s}s`;
}

function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = '';
    errorMessage.classList.add('hidden');
}
