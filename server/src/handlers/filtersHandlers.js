const {
    filters
} = require('../controllers/filters');

const filtersHandlers = async  (req, res) => {
    try {
        const {gender ,status, species, type } = req.query;
        const filteredCharacters = await filters({gender, status, species, type});
        console.log("filtrados: " , filteredCharacters);
        
        return res.status(200).json(filteredCharacters);
    } catch (error) {
        console.error('Error on handler', error);
        return res.status(500).json({error: error.message})        
    }
}

module.exports = { filtersHandlers }