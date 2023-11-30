//Header Functionality //
let latitude;
let longitude;
const menuButton = document.getElementById("menuBtn");
const hambargeButton = document.getElementById("hambargBtn");
const cancelButton = document.getElementById("cancelBtn");
const navMenuMobile = document.getElementById("navMenuMobile");
const findMyLocationBtn = document.getElementById("findMyLocationBtn");

menuButton.addEventListener("click", () => {
  hambargeButton.classList.toggle("hambar-btn");
  cancelButton.classList.toggle("cancel-btn");
  navMenuMobile.classList.toggle("nav-menu-mobile");
});

//Search The City //
const searchField = document.getElementById("searchField");
const searchButton = document.getElementById("searchButton");

// searchField.addEventListener("change", (event) => {});
const todayDateObj = new Date();
const tomorrowDateObj = new Date();
tomorrowDateObj.setDate(todayDateObj.getDate() + 1);
console.log(tomorrowDateObj.toLocaleString("en-US"));

//Add Result container//
const addResultsContainer = (todaysData, tomorrowsData) => {
  const contentContainer = document.getElementById("contentContainer");
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const todayFormateDate = todayDateObj.toLocaleDateString("en-US", options);
  const tomorrowFormatDate = tomorrowDateObj.toLocaleDateString(
    "en-US",
    options
  );
  const createElements = `<div class="explore-container">
          <div>
            <h3 class="sunrise-sunset-heading">
              What Time is Sunrise and Sunset in
              <span>${searchField.value}</span>
            </h3>
            <p class="sunrise-sunset-description">
              Here are today's sunrise and sunset times in
              <span>${searchField.value}</span>
            </p>
            <div>
              <div class="sunrise-and-sunset-btn-container">
                <button type="button" class="btn sunrise-btn" id="sunriseButton">
                  Sunrise
                </button>
                <button type="button" class="btn sunset-btn" id="sunsetButton">
                  Sunset
                </button>
              </div>
              <div id="sunriseContainer">
                <div class="sunrise-container">
                  <div class="sunrise-content-container sunrise-background">
                    <p class="timezone">TimeZone: ${todaysData.timezone}</p>
                    <h5 class="day-heading">Today</h5>
                    <p class="date">${todayFormateDate}</p>
                    <h5 class="day-type-heading">Sunrise</h5>
                    <img
                      src="./images/sunrise.jpg"
                      alt="sunImage"
                      class="sun-image"
                    />
                    <p class="day-type-time">${todaysData.sunrise}</p>
                    <p class="first-day-type-time">dawn: ${todaysData.dawn}</p>
                    <p class="day-type-description">
                      Sunrise today in <span>${searchField.value}</span> was at
                      ${todaysData.sunrise} IST
                    </p>
                    <div class="day-length-solar-container">
                      <p class="day-length">Day length: ${
                        todaysData.day_length
                      }</p>
                      <p class="solar-noon">Solar Noon: ${
                        todaysData.solar_noon
                      }</p>
                    </div>
                  </div>
                </div>
                <div class="sunrise-container">
                  <div class="sunrise-content-container sunrise-background">
                    <p class="timezone">TimeZone: ${tomorrowsData.timezone}</p>
                    <h5 class="day-heading">Tomorrow</h5>
                    <p class="date">${tomorrowFormatDate}</p>
                    <h5 class="day-type-heading">Sunrise</h5>
                    <img
                      src="./images/sunrise.jpg"
                      alt="sunImage"
                      class="sun-image"
                    />
                    <p class="day-type-time">${tomorrowsData.sunrise}</p>
                    <p class="first-day-type-time">dawn: ${
                      tomorrowsData.dawn
                    }</p>
                    <p class="day-type-description">
                      Sunrise tomorrow in <span>${
                        searchField.value
                      }</span> will be at
                      ${tomorrowsData.sunrise} IST
                    </p>
                    <div class="day-length-solar-container">
                      <p class="day-length">Day length: ${
                        tomorrowsData.day_length
                      }</p>
                      <p class="solar-noon">Solar Noon: ${
                        tomorrowsData.solar_noon
                      }</p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="sunsetContainer" class="sunset-main-container">
                <div class="sunrise-container">
                  <div class="sunrise-content-container sunset-background">
                    <p class="timezone">TimeZone: ${todaysData.timezone}</p>
                    <h5 class="day-heading">Today</h5>
                    <p class="date">${todayFormateDate}</p>
                    <h5 class="day-type-heading">Sunset</h5>
                    <img
                      src="./images/sunset.jpg"
                      alt="sunImage"
                      class="sun-image"
                    />
                    <p class="day-type-time">${todaysData.sunset}</p>
                    <p class="first-day-type-time">dusk: ${todaysData.dusk}</p>
                    <p class="day-type-description">
                      Sunset Today in <span>${
                        searchField.value
                      }</span> will be at ${todaysData.sunset}
                      IST
                    </p>
                    <div class="day-length-solar-container">
                      <p class="day-length">Day length: ${
                        todaysData.day_length
                      }</p>
                      <p class="solar-noon">Solar Noon: ${
                        todaysData.solar_noon
                      }</p>
                    </div>
                  </div>
                </div>
                <div class="sunrise-container">
                  <div class="sunrise-content-container sunset-background">
                    <p class="timezone">TimeZone: ${tomorrowsData.timezone}</p>
                    <h5 class="day-heading">Tomorrow</h5>
                    <p class="date">${tomorrowFormatDate}</p>
                    <h5 class="day-type-heading">Sunset</h5>
                    <img
                      src="./images/sunset.jpg"
                      alt="sunImage"
                      class="sun-image"
                    />
                    <p class="day-type-time">${tomorrowsData.sunset}</p>
                    <p class="first-day-type-time">dusk: ${
                      tomorrowsData.dusk
                    }</p>
                    <p class="day-type-description">
                      Sunset tomorrow in <span>${
                        searchField.value
                      }</span> will be at ${tomorrowsData.sunset}
                      IST
                    </p>
                    <div class="day-length-solar-container">
                      <p class="day-length">Day length: ${
                        tomorrowsData.day_length
                      }</p>
                      <p class="solar-noon">Solar Noon: ${
                        tomorrowsData.solar_noon
                      }</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
  contentContainer.innerHTML = createElements;
  const sunriseContainer = document.getElementById("sunriseContainer");
  const sunsetContainer = document.getElementById("sunsetContainer");
  const sunriseButton = document.getElementById("sunriseButton");
  const sunsetButton = document.getElementById("sunsetButton");

  sunriseButton.addEventListener("click", () => {
    sunriseContainer.classList.remove("sunrise-main-container");
    sunsetContainer.classList.add("sunset-main-container");
  });

  sunsetButton.addEventListener("click", () => {
    sunriseContainer.classList.add("sunrise-main-container");
    sunsetContainer.classList.remove("sunset-main-container");
  });
};

const getTodaySunsetAndSunriseData = async () => {
  if (latitude === undefined && longitude === undefined) {
    alert("this is from sunrise sunset : Something went wrong");
  } else {
    try {
      const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`;
      const option = {
        method: "GET",
      };
      const response = await fetch(url, option);
      const data = await response.json();
      const todaysDay = data.results;
      return todaysDay;
    } catch (error) {
      alert("Something went wrong");
    }
  }
};

const getTomorrowSunriseAndSunsetData = async () => {
  const formateDate = `${tomorrowDateObj.getFullYear()}-${tomorrowDateObj.getMonth()}-${tomorrowDateObj.getDate()}`;
  if (latitude === undefined && longitude === undefined) {
    alert("Someting Went wrong");
  } else {
    try {
      const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&timezone=IST&date=${formateDate}`;
      const option = {
        method: "GET",
      };
      const response = await fetch(url, option);
      const data = await response.json();
      const tomorrowsData = data.results;
      return tomorrowsData;
    } catch (error) {
      alert("Something went wrong");
    }
  }
};

const gettingLatitudeAndLongitudeOfCity = async () => {
  try {
    const cityName = searchField.value;
    
    const url = `https://geocode.maps.co/search?q=${cityName}`;
    const option = {
      method: "GET",
    };
    const response = await fetch(url, option);
    const data = await response.json();
    if (data.length === 0) {
      console.log(data);
      alert("No city is found");
    } else {
      latitude = data[0].lat;
      longitude = data[0].lon;
      const todaysData = await getTodaySunsetAndSunriseData();
      const tomorrowsData = await getTomorrowSunriseAndSunsetData();
      addResultsContainer(todaysData, tomorrowsData);
    }
    // window.location.href = "/sample.html";
  } catch (error) {
    alert("This from geolocation : Something went wrong");
  }
};

searchButton.addEventListener("click", () => {
  if (searchField.value === "") {
    alert("Please enter cityname in search field");
  } else {
    gettingLatitudeAndLongitudeOfCity();
  }
});

searchField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    gettingLatitudeAndLongitudeOfCity();
  }
});
//Add Current Location Button

function getGeoLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      handleGeolocationSuccess();
    },
    (error) => {
      alert("Something went wrong");
    }
  );
}

findMyLocationBtn.addEventListener("click", () => {
  getGeoLocation();
});

async function handleGeolocationSuccess() {
  const todaysData = await getTodaySunsetAndSunriseData();
  const tomorrowsData = await getTomorrowSunriseAndSunsetData();

  addResultsContainer(todaysData, tomorrowsData);
}
// Define latitude and longitude for each location
const locationData = {
  newYork: { latitude: 40.7128, longitude: -74.0060 },
  newJersey: { latitude: 40.0583, longitude: -74.4057 },
  uk: { latitude: 51.509865, longitude: -0.118092 },
  california: { latitude: 36.7783, longitude: -119.4179 },
  // Add more locations as needed
};

// Add click event listeners for each location link
document.getElementById("newYorkLink").addEventListener("click", () => handleLocationLinkClick(locationData.newYork));
document.getElementById("newJerseyLink").addEventListener("click", () => handleLocationLinkClick(locationData.newJersey));
document.getElementById("ukLink").addEventListener("click", () => handleLocationLinkClick(locationData.uk));
document.getElementById("californiaLink").addEventListener("click", () => handleLocationLinkClick(locationData.california));
// Add more click event listeners for additional locations

function handleLocationLinkClick(location) {
  latitude = location.latitude;
  longitude = location.longitude;
  handleGeolocationSuccess();
}

const largeFindMyLocationLink = document.getElementById("largeFindMyLocation");
const mobileFindMyLocationLink = document.getElementById(
  "mobileFindMyLocation"
);

largeFindMyLocationLink.addEventListener("click", () => {
  getGeoLocation();
});

mobileFindMyLocationLink.addEventListener("click", () => {
  getGeoLocation();
});
