// this is used for maintaining the forecast data

//this is the API key 
const key ="tJMydJUbvxmy4hfVjIhTdvEcNvilGVIY";
// we can make only 50 requests using this key per day
// to make more than 50 requests we need delete the old app and create a new app and new key from accuweather


// this is to get the current weather information
const getWeather = async(id) =>{
    const base = "http://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base+query);
    const data = await response.json();

    return data[0];
};


// this is to get the city information
const getCity = async(city) =>{
    const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base+query);
    const data = await response.json();

    return data[0];
};


