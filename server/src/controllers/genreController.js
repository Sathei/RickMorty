const axios = require('axios')
const { Genre } = require('../db.js');
const url = "https://rickandmortyapi.com/api/character";
let currentPage = 1
const lastPage = 43;

const getAllGenre = async() => {
    let genres = new Set();
    do {
        const { data } = await axios.get(`${url}/?page=${currentPage}`)
        const uniqueGenres = data.results.map((character) => character.gender);

        uniqueGenres.forEach(genre => genres.add(genre));
    
        
        currentPage = currentPage + 1
        console.log(currentPage);
        
    } while (currentPage < lastPage);
    const genresArray = [...genres].map(genre => ({name: genre}));
    console.log(genresArray);
    genresArray.forEach(async(g) =>{
        await Genre.findOrCreate({
            where: {
                name: g.name
            }
        })
    })
    return genresArray;
}

module.exports = {
    getAllGenre
};