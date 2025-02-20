const { getUniqueFilterOptions } = require('../controllers/filtersOptions.js')
const getFilterOptionsHandler = async (req, res) => {
    try {
        const options = await getUniqueFilterOptions();
        return res.status(200).json(options);
    } catch (error) {
        console.error('Error fetching filter options:', error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getFilterOptionsHandler };
