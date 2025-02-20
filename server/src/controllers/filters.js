const axios = require('axios');
const base_url = "https://rickandmortyapi.com/api/character/?";

const filters = async ({gender, status, species, type}) => {
    try {
        let query = [];
        if(gender) query.push(`gender=${gender}`);
        if(type) query.push(`type=${type}`);
        if(species) query.push(`species=${species}`);
        if(status) query.push(`status=${status}`);

        const url = `${base_url}?${query.join('&')}`;
        const { data } = await axios.get(url)

        if (!data.results) return [];

        return data.results.filter(character => !gender || character.gender.toLowerCase() === gender.toLowerCase()).map((character) => ({
            id: character.id,
            name: character.name,
            status: character.status,
            species: character.species,
            type: character.type,
            gender: character.gender,
            image: character.image
        }))
        
        
    } catch (error) {
        console.error("Error fetching filtered characters", error);
        return [];
    }
}

module.exports = {
    filters
}