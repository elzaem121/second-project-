/* Global Variables */
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=18c17e65995be2a50f99f0b8bb910d8d&units=imperial";
const generateBtn = document.getElementById("generate");

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

//  Event listener to add function to Html dom Element
generateBtn.addEventListener("click", function () {
  // HTML element to get user input values
  const newZip = document.querySelector("#zip").value;
  const feelings = document.querySelector("#feelings").value;
  // console.log(newZip);
  // post data to API
  getWeather(newZip).then(function (data) {
    if (!newZip || !feelings)
      return alert("please enter zip code and your feelings");
    storeData("/setData", {
      date: newDate,
      temperature: data,
      content: feelings,
    }).then(function () {
      // call updateUI to update content
      updateUI();
    });
  });
});

// get zip code information from API

const getWeather = async function (newZip) {
  const req = await fetch(baseUrl + newZip + apiKey);
  try {
    const res = await req.json();
    return res.main.temp;
  } catch (error) {
    console.log("error", error);
  }
};

// post request to store data
const storeData = async function (url = "", data = {}) {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
};

// Function to Get project data
const updateUI = async function () {
  const request = await fetch("/setData");
  const myDate = document.querySelector("#date");
  const myTemperature = document.querySelector("#temperature");
  const myContent = document.querySelector("#content");
  try {
    const myData = await request.json();
    // console.log(myData);
    myDate.innerHTML = `Date: ${myData.date}`;
    myTemperature.innerHTML = `Temperature: ${myData.temperature}`;
    myContent.innerHTML = `Content: ${myData.content}`;
  } catch (error) {
    console.log("error", error);
  }
};
