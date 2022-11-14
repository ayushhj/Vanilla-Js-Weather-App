const button = document.querySelector(".btn");
const form = document.querySelector("form");
const tablebody = document.querySelector(".tablebody");
const search = document.querySelector("#search");
const table2 = document.querySelector(".table2")
const div = document.createElement('div');

div.classList.add("nodata")
div.innerHTML = `
    <h4>No Data</h4>
  `;
table2.appendChild(div)


var arr = []
//get data
//we can do this by promises as well.
const getWeather = async (city) => {
  const url = ` https://python3-dot-parul-arena-2.appspot.com/test?cityname=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  
  //  console.log(data)
  //  console.log(data.date_and_time.split(",")[1])
  return showWeather(data, city);
};




//Show Weather
const showWeather = (data, city) => {
  const check =document.querySelector(".nodata")
  if(check){
    table2.removeChild(div)
  }  
  const currdate = new Date();
  const time = currdate.getHours();
  const WeatherTime = parseInt(data.date_and_time.split(",")[1]);
  //console.log(time - WeatherTime)
  const dataAge = Math.abs(time - WeatherTime)
  

  var obj = {
    name:city,
    description: data.description,
    temperature:data.temp_in_celsius,
    time: data.date_and_time
  };
  arr.push(obj)

  localStorage.setItem(city, JSON.stringify(data));

  tablebody.innerHTML += `

    <tr id="${city.split(" ").join("-").toLowerCase()}-row" >
    <td>${city}</td>
    <td contenteditable="true" >${data.description}</td>
    <td>${data.temp_in_celsius}</td>
    <td>${data.pressure_in_hPa}</</td>
    <td>${dataAge}</td>
    <td><a href="javascript:deleteCity('${city}')">Delete</a></td>
       
</tr>
`;
};

var i = 0;
button.addEventListener("click", function () {
  //console.log(i);
  const high = document.querySelector(".high").getElementsByTagName("td");
  high[i].style.border = "3px solid green";
  // console.log(high[i].innerText)
  getWeather(high[i].innerText);
  i=i+1;
  if(i==4){
    i=0;
  }
  
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  var city = document.getElementById("search").value;
  //console.log(city);
  if (city) {
    city = city.toLowerCase();
    const cityRow = document.querySelector(`#${city.split(" ").join("-")}-row`);
    if (cityRow) {
      cityRow.classList.add("highlight");
      setTimeout(() => {
        cityRow.classList.remove("highlight");
      }, 3000);
    }
  }
});

const deleteCity = (city) => {

if(window.localStorage.length == 1){
  table2.appendChild(div)
} 
  arr.splice(arr.findIndex(item => item.name == `${city}`), 1)
  //console.log(city);
  const cityRow = document.querySelector(
    `#${city.toLowerCase().split(" ").join("-")}-row`
  );
  if (cityRow) cityRow.remove();
  localStorage.removeItem(city);
};
