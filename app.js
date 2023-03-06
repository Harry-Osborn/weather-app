// this script is for DOM manupulation

let form = document.getElementsByTagName("input");
const card = document.getElementsByClassName("card");
const details = document.getElementsByClassName("details");
const time = document.getElementsByClassName("time");
const icon = document.getElementsByClassName("icon");

const updateData= (data) =>{

    const citydets = data.cityDetails;
    const weather = data.weather;

    // update details template
    details[0].innerHTML = `
        <p class="text-yellow-500 text-4xl font-bold p-2">${citydets.EnglishName}</p>
        <p class="text-green-300 text-3xl font-semibold p-2">${weather.WeatherText}</p>
        <p class="text-orange-500 text-5xl font-extrabold pt-3">${weather.Temperature.Metric.Value}&deg;C</p>
        `;

    // update the night/day and the icon images
    const iconSrc = `images/icons/${weather.WeatherIcon}.svg`;
    icon[0].setAttribute('src', iconSrc);
  
    const timeSrc = weather.IsDayTime ? 'images/day.png' : 'images/night.png';
    time[0].setAttribute('src', timeSrc);


    // updating the hidden property of the card
    if(card[0].classList.contains("hidden")){
        card[0].classList.remove("hidden");
    }
};

form[0].addEventListener("keydown",(e)=>{

    const UpdateCity = async (city) =>{

        const cityDetails = await getCity(city);
        const weather = await getWeather(cityDetails.Key);

        return{
            cityDetails : cityDetails,
            weather : weather
        };
    };

    if(e.key == "Enter"){

        // preventing the default action
        e.preventDefault();

        // to get the city value
        let city = e.target.value;
        e.target.value = "";

        // update the UI with new city
        UpdateCity(city)
            .then(data => updateData(data))
            .catch(err => console.log(err));
    }
});

