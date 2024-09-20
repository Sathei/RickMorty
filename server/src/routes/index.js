const { Router } = require("express");

const { getAllCharactersHandler, getCharacterByIdHandler, getCharacterByNameHandler, createCharHandler, deleteCharHandler }= require('../handlers/charactersHandler.js')
const { getGenreHandler } = require('../handlers/genreHandler.js')
const { getLocationHandler } = require('../handlers/locationHandler.js')
const router = Router();
router.get('/characters', getAllCharactersHandler);
router.get('/characters/search', getCharacterByNameHandler);
router.get('/character/:idChar', getCharacterByIdHandler);
router.get('/genres', getGenreHandler);
router.get('/locations', getLocationHandler);
router.post('/create', createCharHandler);
router.delete('/delete', deleteCharHandler);


module.exports = router