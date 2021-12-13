/* Global Variables */
const baseUrl = "http://api.openweathermap.org/data/2.5/forecast?zip=";
const apiKey = "&appid=18c17e65995be2a50f99f0b8bb910d8d&units=imperial";
const apiUrl = "http://localhost:5800/";

const generateBtn = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

generateBtn.addEventListener("click", function () {
  const newZip = document.querySelector("#zip").value;
  const feelings = document.querySelector("#feelings").value;
  console.log(newZip);

  getWeather(newZip).then(function (data) {
    if (!newZip) return alert("please enter zip code");
    // console.log(data);

    postData("/add", data);
    updateUI();
  });
});

const getWeather = async function (newZip) {
  const req = await fetch(baseUrl + newZip + apiKey);
  try {
    const res = await req.json();
    return res;
  } catch (error) {
    console.log("error", error);
  }
};

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

const updateUI = async function () {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    // console.log(allData);
    document.getElementById("date").innerHTML = `Date: ${allData.date}`;
    document.getElementById("temp").innerHTML = `Temperatuer: ${allData.temp}`;
    document.getElementById("content").innerHTML = `I feel: ${allData.content}`;
  } catch (error) {
    console.log("error", error);
  }
};
