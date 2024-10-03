const axios = require('axios');
const { Location } = require('../db')
const url = "https://rickandmortyapi.com/api/character";
let currentPage = 1;
const lastPage= 43

const getAllLocation = async() => {
    let locations = new Set();
    do {
        const { data } = await axios.get(`${url}/?page=${currentPage}`)
        const uniqueLocations = data.results.map((character) => character.location.name);

        uniqueLocations.forEach(location => locations.add(location));

        currentPage++;
        
        
    } while (currentPage < lastPage);

    const locationsArray = [...locations].map(location => ({name: location}));
    console.log(locationsArray);

    locationsArray.forEach(async(l) => {
        await Location.findOrCreate({
            where:{
                name: l.name
            }
        })
    })

    return locationsArray;
}

module.exports = {
    getAllLocation
}
