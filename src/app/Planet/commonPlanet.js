const Planet = require('./Planet');

class CommonPlanet extends Planet {
  constructor(id, repository, requestHandler) {
    super(id);
    this.repository = repository;
    this.requestHandler = requestHandler;
  }

  async init() {
    let planetResult = await this.repository.findById(this.id);

    if (!planetResult) {
      planetResult = await this.requestHandler.genericRequest(
        `${process.env.SWAPI_URL}/planets/${this.id}`,
        'GET',
        null,
        false
      );

      this.setGravity(planetResult.gravity);
      const gravity = this.getGravity();

      planetResult.gravity = gravity;

      await this.repository.savePlanet(this.id, planetResult.name, gravity);
    }

    this.name = planetResult.name;
    this.gravity = planetResult.gravity;
  }
}

module.exports = CommonPlanet;
