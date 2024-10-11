const { getAllCharacters, getCharacterById, getCharacterByName, createCharacter, deleteCharacter } = require("../controllers/charactersController.js")

const getAllCharactersHandler = async (req, res) => {
    try {
        const characters = await getAllCharacters();
        return res.status(200).json(characters);
    } catch (error) {
        console.error(error);
        return res.status(400).json({error: error.message})
    }
}

const getCharacterByIdHandler = async (req, res) => {
    const { idChar } = req.params;
    if(!idChar) return  res.status(400).json({message: 'Id is required'})
    try {
        const character = await getCharacterById(idChar);
        return res.status(200).json(character);
            
    } catch (error) {
        console.error(error);
        return res.status(500).json("There's no character with that ID");
    }
}

const getCharacterByNameHandler = async (req, res) => {
    const { name } = req.query;
    if(!name) return res.status(400).json({error: "Name is required"})

    try {
        const results = await getCharacterByName(name);
        return res.status(200).json(results)
    } catch (error) {
        console.error(error);
        return res.status(500).json("Character not found");
    }
}

const createCharHandler = async (req, res) => {
    const { name, status, specie, type, gender, origin, location, image } = req.body;

    try {
        const character = await createCharacter(name, status, specie, type, gender, origin, location, image)
        return res.status(201).json(character);
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: error.message});
    }
}

const deleteCharHandler = async (req, res) => {
    const { id } = req.body
    try {
        deleteCharacter(id);
        return res.status(200).json(`Character with id ${id} deleted.`)
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message})
    }    
}

module.exports = {
    getAllCharactersHandler,
    getCharacterByIdHandler,
    getCharacterByNameHandler,
    createCharHandler,
    deleteCharHandler
}