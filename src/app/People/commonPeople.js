const AbstractPeople = require('./abstractPeople');

class CommonPeople extends AbstractPeople {
  constructor(id, repository, requestHandler) {
    super(id);
    this.repository = repository;
    this.requestHandler = requestHandler;
  }

  async init() {
    const id = this.getId();
    let peopleResult = await this.repository.findById(id);

    if (!peopleResult) {
      peopleResult = await this.requestHandler.genericRequest(`${process.env.SWAPI_URL}/people/${id}`, 'GET', null, false);

      this.setHomeworlId(peopleResult.homeworld);
      await this.setHomeworldName();

      peopleResult.homeworlId = this.getHomeworlId();
      peopleResult.homeworldName = this.getHomeworldName();

      await this.repository.savePeople({ ...peopleResult, id });
    }

    this.name = peopleResult.name;
    this.mass = +peopleResult.mass;
    this.height = +peopleResult.height;
    this.homeworlId = peopleResult.homeworlId;
    this.homeworldName = peopleResult.homeworldName;
  }

  async setHomeworldName() {
    const id = this.getHomeworlId();
    const planetResponse = await this.requestHandler.genericRequest(`${process.env.SWAPI_URL}${id}`, 'GET', null);
    this.homeworldName = planetResponse.name;
  }

  setHomeworlId(url) {
    const homeworlSplit = url.split('/');
    this.homeworlId = `/planets/${homeworlSplit[homeworlSplit.length - 2]}`;
  }
}

module.exports = CommonPeople;
