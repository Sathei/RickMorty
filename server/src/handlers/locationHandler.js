const { getAllLocation } = require('../controllers/locationController');

const getLocationHandler = async (req, res) => {
    try {
        const locations = await getAllLocation();
        res.status(200).json(locations);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    getLocationHandler
}