const { PlanetRepository } = require('../../app/repository');

const mockTable = {
  findOne: jest.fn(),
  create: jest.fn(),
};

describe('PlanetRepository', () => {
  let planetRepository;

  beforeEach(() => {
    planetRepository = new PlanetRepository(mockTable);
  });

  afterEach(() => {
    mockTable.findOne.mockClear();
    mockTable.create.mockClear();
  });

  describe('findById', () => {
    it('should call table.findOne with the correct id', async () => {
      const id = 1;

      await planetRepository.findById(id);

      expect(mockTable.findOne).toHaveBeenCalledTimes(1);
      expect(mockTable.findOne).toHaveBeenCalledWith({ where: { id } });
    });

    it('should return the result of table.findOne', async () => {
      const id = 1;
      const mockPlanet = { id, name: 'Tatooine', gravity: 1.0 };

      mockTable.findOne.mockResolvedValue(mockPlanet);

      const planet = await planetRepository.findById(id);

      expect(planet).toEqual(mockPlanet);
    });
  });

  describe('savePlanet', () => {
    it('should call table.create with the correct parameters', async () => {
      const id = 1;
      const name = 'Tatooine';
      const gravity = 1.0;

      await planetRepository.savePlanet(id, name, gravity);

      expect(mockTable.create).toHaveBeenCalledTimes(1);
      expect(mockTable.create).toHaveBeenCalledWith({ id, name, gravity });
    });

    it('should return the result of table.create', async () => {
      const id = 1;
      const name = 'Tatooine';
      const gravity = 1.0;
      const mockPlanet = { id, name, gravity };

      mockTable.create.mockResolvedValue(mockPlanet);

      const planet = await planetRepository.savePlanet(id, name, gravity);

      expect(planet).toEqual(mockPlanet);
    });
  });
});
