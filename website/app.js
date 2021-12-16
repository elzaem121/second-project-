/* Global Variables */
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=18c17e65995be2a50f99f0b8bb910d8d&units=imperial";
const generateBtn = document.getElementById("generate");
// const apiUrl = "http://localhost:5800/";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//  Event listener to add function to Html dom Element
generateBtn.addEventListener("click", function () {
  // get user input values
  const newZip = document.querySelector("#zip").value;
  const feelings = document.querySelector("#feelings").value;
  console.log(newZip);
  // post data to API
  getWeather(newZip).then(function (data) {
    if (!newZip) return alert("please enter zip code");
    postData("/add", {
      date: newDate,
      temp: data,
      content: feelings,
    }).then(function () {
      // call updateUI to update browser content
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

// Function to post data to server
const postData = async function (url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    // return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// Function to Get project data
const updateUI = async function () {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    // console.log(allData);
    document.getElementById("date").innerHTML = `Date: ${allData.date}`;
    document.getElementById("temp").innerHTML = `Temperature: ${allData.temp}`;
    document.getElementById("content").innerHTML = `I feel: ${allData.content}`;
  } catch (error) {
    console.log("error", error);
  }
};
