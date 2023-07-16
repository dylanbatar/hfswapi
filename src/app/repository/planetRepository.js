class PlanetRepository {
  constructor(table) {
    this.table = table;
  }

  async findById(id) {
    return await this.table.findOne({ where: { id } });
  }

  async savePlanet(id, name, gravity) {
    return await this.table.create({ id, name, gravity });
  }
}

module.exports = PlanetRepository;
