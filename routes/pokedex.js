const express = require('express');
const request = require("request");
const pokeapi = 'https://pokeapi.co/api/v2/pokemon';
const pngLocation = '/images';

// Get the references we will need
const router = express.Router();
// router.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });

function setPokemons(data) {
    const pokemons = data.map(pokemon => {
        let { url } = pokemon;
        pokemon.id = url.substring(34, url.length - 1);
        pokemon.image = `${pngLocation}/${pokemon.id}.png`;
        return pokemon;
    })

    return pokemons;
};

/* GET all the pokemon */
router.get('/', (req, res) => {
    request(pokeapi, function (err, response, body) {
        if (err) {
            throw err; // If we get an error then bail
        }
        // Use Express to send the JSON back to the client in the web response
        let jsonResp = JSON.parse(body);
        console.log(setPokemons(jsonResp.results));
        res.send(jsonResp);
    });
});

/* GET a specific pokemon */
router.get('/:id', (req, res) => {
    const reqUri = `${pokeapi}/${req.params.id}/`;
    console.log(`Sending request: ${reqUri}`);

    request(reqUri, function (err, response, body) {
        if (err) {
            throw err; // If we get an error then bail
        }
        // Use Express to send the JSON back to the client in the web response
        res.send(JSON.parse(body));
    });
});

// Export the routes
module.exports = router;