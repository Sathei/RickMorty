const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const { getAllGenre } = require('../server/src/controllers/genreController.js')
const { getAllLocation } = require("../server/src/controllers/locationController.js");


conn.sync({ force: true }).then( async () => {

  await getAllGenre(); 
  await getAllLocation();

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
