const axios = require("axios");
const { Character, Genre, Location } = require("../db");
;
const url = "https://rickandmortyapi.com/api/character";
const urlId = "https://rickandmortyapi.com/api/character/";


const getAllCharacters = async () => {
    const { data } = await axios(`${url}`)
    const characters = data.results.map((character) => ({
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        type: character.type,
        gender: character.gender,
        image: character.image
    }))
    return characters;
}

const getCharacterById = async (idChar) => {
    try {
        
        console.log(idChar, 'ID CHAR');
        const { data } = await axios(`${urlId}/${idChar}`)
        console.log(data, ' esto es data');
        const character = {
            idChar,
            name: data.name,
            status: data.status,
            species: data.species,
            type: data.type,
            gender: data.gender,
            origin: data.origin.name,
            location: data.location.name,
            image: data.image
        }
        return character;
    } catch (error) {
        console.error(error);
    }   
}

const getCharacterByName = async (name) => {
console.log(name, "nombre");
    const { data } = await axios(`${urlId}?name=${name}`)

    const characters = data.results.map(({id, name, status}) => ({
        id,
        name,
        status
    }))
    return characters
}

const createCharacter = async (name, status, specie, type, gender, origin, location, image) => {
    const newChar = await Character.create({
        name,
        status,
        specie,
        type,
        gender,
        origin,
        location,
        image
    });

    let genreDB = await Genre.findOne({ where: { name: gender } });
    let [locationDB] = await Location.findOrCreate({ where: { name: location } });

    if (genreDB) {
        await newChar.setGenre(genreDB);
    }

    if (locationDB) {
        await newChar.setLocation(locationDB);
    }
    return newChar;
}

const deleteCharacter = async (id) => {
    let character = await Character.findOne({where: {id: id}});
    if(character){
        character.deleted = true;
        await character.save();
        console.log(`Character with id ${id} deleted.`);
    } else {
        console.log(`Character with id ${id} not found.`);
    }

}

module.exports = {
    getAllCharacters,
    getCharacterById,
    getCharacterByName,
    createCharacter,
    deleteCharacter
}