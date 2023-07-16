const LoggingRepository = require('../../app/repository/loggingRepository');
const PeopleRepository = require('../../app/repository/peopleRepository');
const PlanetRepository = require('../../app/repository/planetRepository');
const PeopleService = require('../../app/services/peopleService');
const PlanetService = require('../../app/services/planetService');

const _isWookieeFormat = (req) => {
  if (req.query.format && req.query.format == 'wookiee') {
    return true;
  }
  return false;
};

const applySwapiEndpoints = (server, app) => {
  server.get('/hfswapi/test', async (req, res) => {
    const data = await app.swapiFunctions.genericRequest(
      'https://swapi.dev/api/',
      'GET',
      null,
      true
    );
    res.send(data);
  });

  server.get('/hfswapi/getPeople/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const isWookie = _isWookieeFormat(req);
      const peopleRepository = new PeopleRepository(app.db.swPeople);
      const peopleService = new PeopleService(
        peopleRepository,
        app.swapiFunctions
      );
      const serviceResponse = await peopleService.getPeople(id, isWookie);
      res.status(200).json(serviceResponse);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  server.get('/hfswapi/getPlanet/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const isWookie = _isWookieeFormat(req);
      const planetRepository = new PlanetRepository(app.db.swPlanet);
      const planetService = new PlanetService(
        planetRepository,
        app.swapiFunctions
      );
      const serviceResponse = await planetService.getPlanet(id, isWookie);
      res.status(200).json(serviceResponse);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
    res.sendStatus(501);
  });

  server.get('/hfswapi/getLogs', async (req, res) => {
    const loggingRepository = new LoggingRepository(app.db.logging);
    const data = await loggingRepository.getLogs();
    res.send(data);
  });
};

module.exports = applySwapiEndpoints;
