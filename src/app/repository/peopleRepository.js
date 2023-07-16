class PeopleRepository {
  constructor(table) {
    this.table = table;
  }

  async findById(id) {
    const result = await this.table.findOne({ where: { id } });

    if (!result) return null

    return {
      name: result.name,
      mass: result.mass,
      height: result.height,
      homeworldName: result.homeworld_name,
      homeworlId: result.homeworld_id,
    };
  }

  async savePeople(people) {
    const { id, name, mass, height, homeworldName, homeworlId } = people;
    return await this.table.create({
      id,
      name,
      mass,
      height,
      homeworld_name: homeworldName,
      homeworld_id: homeworlId,
    });
  }
}

module.exports = PeopleRepository;
