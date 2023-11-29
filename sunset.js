document.addEventListener('DOMContentLoaded', function () {
    if ('geolocation' in navigator) {
        document.getElementById('current-location').addEventListener('click', getCurrentLocation);
    } else {
        showError('Geolocation is not supported by your browser.');
    }

    document.getElementById('search-button').addEventListener('click', searchLocation);
    document.getElementById('named-locations').addEventListener('change', function () {
        const selectedLocation = this.value;
        getSunriseSunsetData(selectedLocation);
    });
});

function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, { timeout: 5000 });
}

function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getSunriseSunsetData(latitude, longitude);
}

function errorCallback(error) {
    let errorMessage = 'Error getting current location.';

    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage += ' User denied the request for Geolocation.';
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage += ' Location information is unavailable.';
            break;
        case error.TIMEOUT:
            errorMessage += ' The request to get user location timed out.';
            break;
        case error.UNKNOWN_ERROR:
            errorMessage += ' An unknown error occurred.';
            break;
    }

    showError(errorMessage);
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

function getSunriseSunsetData(latitude, longitude) {
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
}

function clearDashboard() {
    const dashboardElement = document.getElementById('dashboard-content');
    dashboardElement.innerHTML = ''; // Clear previous content
}

function updateDashboard(data) {
    const dashboardElement = document.getElementById('dashboard-content');
    
    // Create and append new sections for each piece of information
    createDashboardSection('Sunrise Today', convertUtcToLocalTime(data.results.sunrise, 'America/New_York'));
    createDashboardSection('Sunset Today', convertUtcToLocalTime(data.results.sunset, 'America/New_York'));
    createDashboardSection('Dawn Today', convertUtcToLocalTime(data.results.civil_twilight_begin, 'America/New_York'));
    createDashboardSection('Dusk Today', convertUtcToLocalTime(data.results.civil_twilight_end, 'America/New_York'));
    createDashboardSection('Day Length Today', secondsToHms(data.results.day_length));
    createDashboardSection('Solar Noon Today', convertUtcToLocalTime(data.results.solar_noon, 'America/New_York'));
    createDashboardSection('Time Zone', 'America/New_York');
}

function createDashboardSection(title, content) {
    const dashboardElement = document.getElementById('dashboard-content');

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

