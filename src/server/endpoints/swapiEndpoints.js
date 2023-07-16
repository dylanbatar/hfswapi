const LoggingRepository = require('../../app/repository/loggingRepository');
const PeopleRepository = require('../../app/repository/peopleRepository');
const PlanetRepository = require('../../app/repository/planetRepository');
const LoggingService = require('../../app/services/LoggingService');
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
    try {
      const isWookie = _isWookieeFormat(req);
      const peopleRepository = new PeopleRepository(app.swPeople);
      const planetRepository = new PlanetRepository(app.swPlanet);
      const peopleService = new PeopleService(
        peopleRepository,
        app.swapiFunctions
      );

      const planetService = new PlanetService(
        planetRepository,
        app.swapiFunctions
      );

      const serviceResponse = await peopleService.getWeightOnPlanetRandom(planetService, isWookie);

      res.status(200).json(serviceResponse);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  server.get('/hfswapi/getLogs', async (req, res) => {
    try {
      const loggingRepository = new LoggingRepository(app.db.logging);
      const loggingService = new LoggingService(loggingRepository);
      const serviceResponse = await loggingService.getAllLogs();
      res.send(serviceResponse);
    } catch (error) {
      res.status(500).send(error);
    }
  });
};

module.exports = applySwapiEndpoints;
