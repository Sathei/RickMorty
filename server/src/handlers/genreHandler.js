const  { getAllGenre } = require('../controllers/genreController.js')

const getGenreHandler = async (req, res) => {
    try {
        const genres = await getAllGenre();
        res.status(200).json(genres)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});        
    }
}

module.exports = {
    getGenreHandler
}