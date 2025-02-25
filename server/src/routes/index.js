const { Router } = require("express");

const { getAllCharactersHandler, getCharacterByIdHandler, getCharacterByNameHandler, createCharHandler, deleteCharHandler }= require('../handlers/charactersHandler.js')
const { getGenreHandler } = require('../handlers/genreHandler.js')
const { getLocationHandler } = require('../handlers/locationHandler.js')
const { loginHandler, registerHandler } = require('../handlers/userHandler.js')
const { filtersHandlers } = require("../handlers/filtersHandlers.js")
const { getFilterOptionsHandler } = require("../handlers/optionsHandler.js");
const router = Router();
router.get('/characters', getAllCharactersHandler);
router.get('/characters/search', getCharacterByNameHandler);
router.get('/character/:idChar', getCharacterByIdHandler);
router.get('/genres', getGenreHandler);
router.get('/locations', getLocationHandler);
router.get('/filters', filtersHandlers);
router.get('/filters-options', getFilterOptionsHandler);
router.post('/create', createCharHandler);
router.post('/login', loginHandler);
router.post('/register', registerHandler);
router.delete('/delete', deleteCharHandler);



module.exports = router