const { planetFactory } = require('../Planet');

class PlanetService {
  constructor(repository, requestHandler) {
    this.repository = repository;
    this.requestHandler = requestHandler;
  }

  async getPlanet(id, isWookie) {
    const planet = await planetFactory(
      id,
      this.repository,
      this.requestHandler,
      isWookie
    );

    return {
      name: planet.getName(),
      gravity: planet.getGravity(),
    };
  }
}

module.exports = PlanetService;
