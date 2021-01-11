import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {

    let changeableUrl = url;

    if (country) {
      changeableUrl = `${url}/countries/${country}`
    }


    try {
        const { data } = await axios.get(changeableUrl);
        
        const modifiedData = {
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate
        }

        return modifiedData;

    } catch (error) {
      console.log(error)

    }
}


// export const fetchDailyData = async () => {
//     try {
//         const {data} = await axios.get(`${url}/daily`);

//         const modifiedData = data.map((dailyData) => ({
//             confimed: dailyData.confimed.total,
//             deaths: dailyData.deaths.total,
//             date: dailyData.reportDate,
//         }))
//         console.log(modifiedData)
//         return modifiedData;
//     } catch (error) {


//     }
// }


// Instead of Global, it fetches the daily data for the US
export const fetchDailyData = async () => {
    try {
      const { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json');
  
      return data.map(({ positive, recovered, death, dateChecked: date }) => ({ confirmed: positive, recovered, deaths: death, date }));
    } catch (error) {
      return error;
    }
};
  

export const fetchCountries = async () => {
  try {
    // const response = await axios.get(`${url}/countries`);

    const { data: { countries } } = await axios.get(`${url}/countries`)
    
    return countries.map((country) => country.name)
  } catch (error) {
    console.log(error)
  }
}