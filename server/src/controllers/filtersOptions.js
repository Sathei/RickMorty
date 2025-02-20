const axios = require('axios');
const base_url = "https://rickandmortyapi.com/api/character/";

const getUniqueFilterOptions = async () => {
    try {
        const { data } = await axios.get(base_url);
        if (!data.results) return {};

        const characters = data.results;

        const uniqueGenders = [...new Set(characters.map(char => char.gender))];
        const uniqueStatus = [...new Set(characters.map(char => char.status))];
        const uniqueSpecies = [...new Set(characters.map(char => char.species))];
        const uniqueTypes = [...new Set(characters.map(char => char.type).filter(Boolean))];

        return {
            genders: uniqueGenders,
            status: uniqueStatus,
            species: uniqueSpecies,
            types: uniqueTypes
        };

    } catch (error) {
        console.error("Error fetching unique filter options", error);
        return {};
    }
};

module.exports = { getUniqueFilterOptions };
