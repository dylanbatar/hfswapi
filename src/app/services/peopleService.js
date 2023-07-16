const { peopleFactory } = require('../People');
const { CHARACTERS_COUNT, PLANETS_COUNT } = process.env;

class PeopleService {
  url = 'https://swapi.dev/api/people/';

  constructor(repository, swapiFunction) {
    this.repository = repository;
    this.swapiFunction = swapiFunction;
  }

  async getPeople(id, isWookie) {
    const people = await peopleFactory(id, this.repository, this.swapiFunction, isWookie);

    return {
      name: people.getName(),
      mass: people.getMass(),
      height: people.getHeight(),
      homeworldName: people.getHomeworldName(),
      homeworldId: people.getHomeworlId(),
    };
  }

  async getWeightOnPlanetRandom(planetService, isWookie) {
    const randomIdPeople = this.swapiFunction.getRandomNumber(CHARACTERS_COUNT);
    const randomIdPlanet = this.swapiFunction.getRandomNumber(PLANETS_COUNT);

    const [planetResult, people] = await Promise.all([
      planetService.getPlanet(randomIdPlanet, isWookie),
      peopleFactory(randomIdPeople, this.repository, this.swapiFunction, isWookie),
    ]);

    if (isNaN(planetResult.gravity) || !planetResult.gravity) {
      return {
        error: `Sorry we don't have the gravity of ${planetResult.name} ${randomIdPlanet}`,
      };
    }

    if (!people.getMass()) {
      return { error: `Sorry we don't have the mass of ${people.getName()}` };
    }

    if (this.isOtherHomePlanet(people.getHomeworldName(), planetResult.name)) {
      return {
        error: `${people.getHomeworldName()} is ${people.getName()}'s Home planet`,
      };
    }

    const weight = people.getWeightOnPlanet(people.getMass(), planetResult.gravity);

    return {
      people: people.getName(),
      mass: people.getMass(),
      weight,
      planet: {
        name: planetResult.name,
        gravity: planetResult.gravity,
      },
    };
  }

  isOtherHomePlanet(homePlanet, randomPlanet) {
    return homePlanet === randomPlanet;
  }
}

module.exports = PeopleService;
