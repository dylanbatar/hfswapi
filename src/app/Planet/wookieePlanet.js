const Planet = require('./Planet');

class WookieePlanet extends Planet {
  constructor(id, requestHandler) {
    super(id);
    this.requestHandler = requestHandler;
  }

  async init() {
    const planetResult = await this.requestHandler.genericRequest(
      `${process.env.SWAPI_URL}/planets/${this.id}?format=wookiee`,
      'GET',
      null
    );

    this.name = planetResult.whrascwo;
    this.setGravity(planetResult.rrrcrahoahaoro);
  }
}

module.exports = WookieePlanet;
