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
    const apiKey = 'AIzaSyBwAMKFRjZPRybeLrNOIHX9NrAK-U2l7vo'
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const latitude = data.latt;
            const longitude = data.longt;

            fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`)
                .then(response => response.json())
                .then(data => {
                    clearDashboard();
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
    dashboardElement.innerHTML = '';
}

function updateDashboard(data) {
    const dashboardContent = document.getElementById('dashboard-content');
    const currentDate = new Date();
    const todaySunrise = new Date(data.results.sunrise);
    const todaySunset = new Date(data.results.sunset);

    createDashboardSection('Sunrise Today', convertUtcToLocalTime(todaySunrise, 'America/New_York'));
    createDashboardSection('Sunset Today', convertUtcToLocalTime(todaySunset, 'America/New_York'));
    createDashboardSection('Dawn Today', convertUtcToLocalTime(new Date(data.results.civil_twilight_begin), 'America/New_York'));
    createDashboardSection('Dusk Today', convertUtcToLocalTime(new Date(data.results.civil_twilight_end), 'America/New_York'));
    createDashboardSection('Day Length Today', secondsToHms(data.results.day_length));
    createDashboardSection('Solar Noon Today', convertUtcToLocalTime(new Date(data.results.solar_noon), 'America/New_York'));
    createDashboardSection('Time Zone', 'America/New_York');
}

setInterval(() => {
    const selectedLocation = document.getElementById('named-locations').value;
    if (selectedLocation) {
        getSunriseSunsetData(selectedLocation);
    }
}, 60000);

function createDashboardSection(title, content) {
    const dashboardElement = document.getElementById('dashboard');

    const section = document.createElement('div');
    section.classList.add('dashboard-section');
    section.innerHTML = `<h2>${title}</h2><p>${content}</p>`;

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
