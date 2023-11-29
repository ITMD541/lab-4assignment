document.addEventListener('DOMContentLoaded', function () {
    if ('geolocation' in navigator) {
        document.getElementById('current-location').addEventListener('click', getCurrentLocation);
    } else {
        showError('Geolocation is not supported by your browser.');
    }

    document.getElementById('search-button').addEventListener('click', searchLocation);
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

    if (!searchInput) {
        showError('Please enter a location.');
        return;
    }

    // Use Geocode API to get latitude and longitude for the searched location
    fetch(`https://geocode.maps.co/search?q=searchInput`)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const latitude = data.results[0].geometry.lat;
                const longitude = data.results[0].geometry.lng;

                getSunriseSunsetData(latitude, longitude);
            } else {
                showError('Location not found.');
            }
        })
        .catch(error => {
            showError(`Error searching for location: ${error.message}`);
        });
}

function getSunriseSunsetData(latitude, longitude) {
    // Use Sunrise Sunset API to get data
    fetch(`https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873&timezone=UTC&date=1990-05-22`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
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
    
    if (!data.results) {
        showError('Invalid data received from the API.');
        return;
    }

    // Check for the presence of required fields
    const { sunrise, sunset, civil_twilight_begin, civil_twilight_end, day_length, solar_noon, timezone } = data.results;
    if (!sunrise || !sunset || !civil_twilight_begin || !civil_twilight_end || !day_length || !solar_noon || !timezone) {
        showError('Invalid data received from the API.');
        return;
    }

    // Clear previous dashboard content
    clearDashboard();

    // Update the dashboard with the received data
    createDashboardSection('Sunrise Today', convertUtcToLocalTime(sunrise, timezone));
    createDashboardSection('Sunset Today', convertUtcToLocalTime(sunset, timezone));
    createDashboardSection('Dawn Today', convertUtcToLocalTime(civil_twilight_begin, timezone));
    createDashboardSection('Dusk Today', convertUtcToLocalTime(civil_twilight_end, timezone));
    createDashboardSection('Day Length Today', secondsToHms(day_length));
    createDashboardSection('Solar Noon Today', convertUtcToLocalTime(solar_noon, timezone));
    createDashboardSection('Time Zone', timezone);
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
