const WookieePlanet = require('./wookieePlanet');
const CommonPlanet = require('./commonPlanet');

const planetFactory = async (id, repository, requestHandler, wookieeLang) => {
  let planet = null;
  if (wookieeLang) {
    planet = new WookieePlanet(id, requestHandler);
  } else {
    planet = new CommonPlanet(id, repository, requestHandler);
  }
  await planet.init();
  return planet;
};

module.exports = { planetFactory };
