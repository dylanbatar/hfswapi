const AbstractPeople = require('./abstractPeople');

class WookieePeople extends AbstractPeople {
  constructor(id, requestHandler) {
    super(id);
    this.requestHandler = requestHandler;
  }

  async init() {
    const id = this.getId();
    const wookieResult = await this.requestHandler.genericRequest(
      `${process.env.SWAPI_URL}/people/${id}?format=wookiee`,
      'GET',
      null
    );
    this.setHomeworlId(wookieResult.acooscwoohoorcanwa);
    await this.setHomeworldName();

    this.name = wookieResult.whrascwo;
    this.mass = +wookieResult.scracc;
    this.height = +wookieResult.acwoahrracao;
  }

  async setHomeworldName() {
    const id = this.getHomeworlId();
    const planetResponse = await this.requestHandler.genericRequest(
      `${process.env.SWAPI_URL}${id}?format=wookiee`,
      'GET',
      null,
    );
    this.homeworldName = planetResponse.whrascwo;
  }

  setHomeworlId(url) {
    const homeworlSplit = url.split('/');
    this.homeworlId = `/planets/${homeworlSplit[homeworlSplit.length - 2]}`;
  }
}

module.exports = WookieePeople;
