const { peopleFactory } = require('../People');

class PeopleService {
  url = 'https://swapi.dev/api/people/';

  constructor(repository, requestHandler) {
    this.repository = repository;
    this.requestHandler = requestHandler;
  }

  async getPeople(id, isWookie) {
    const people = await peopleFactory(
      id,
      this.repository,
      this.requestHandler,
      isWookie
    );

    return {
      name: people.getName(),
      mass: people.getMass(),
      height: people.getHeight(),
      homeworldName: people.getHomeworldName(),
      homeworldId: people.getHomeworlId(),
    };
  }
}

module.exports = PeopleService;
