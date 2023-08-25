export const apiGetWeather = async (search?: string) => {
  return fetch(
    `${process.env.REACT_APP_API_BASE_URL}/weather?q=${search}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
  ).then((res) => res.json());
};
