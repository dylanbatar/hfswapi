const { PeopleRepository } = require('../../app/repository');

const mockTable = {
  findOne: jest.fn(),
  create: jest.fn(),
};

describe('PeopleRepository', () => {
  let peopleRepository;

  beforeEach(() => {
    peopleRepository = new PeopleRepository(mockTable);
  });

  afterEach(() => {
    mockTable.findOne.mockClear();
    mockTable.create.mockClear();
  });

  describe('findById', () => {
    it('should call table.findOne with the correct id', async () => {
      const id = 1;

      await peopleRepository.findById(id);

      expect(mockTable.findOne).toHaveBeenCalledTimes(1);
      expect(mockTable.findOne).toHaveBeenCalledWith({ where: { id } });
    });

    it('should return null if result is falsy', async () => {
      const id = 1;

      mockTable.findOne.mockResolvedValue(null);

      const result = await peopleRepository.findById(id);

      expect(result).toBeNull();
    });

    it('should map result to expected object', async () => {
      const id = 1;
      const mockResult = {
        id,
        name: 'Luke Skywalker',
        mass: 77,
        height: 172,
        homeworld_name: 'Tatooine',
        homeworld_id: '/planets/1',
      };

      mockTable.findOne.mockResolvedValue(mockResult);

      const expectedResult = {
        name: 'Luke Skywalker',
        mass: 77,
        height: 172,
        homeworldName: 'Tatooine',
        homeworlId: '/planets/1',
      };

      const result = await peopleRepository.findById(id);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('savePeople', () => {
    it('should call table.create with the correct parameters', async () => {
      const people = {
        id: 1,
        name: 'Luke Skywalker',
        mass: 77,
        height: 172,
        homeworldName: 'Tatooine',
        homeworlId: '/planets/1',
      };

      await peopleRepository.savePeople(people);

      expect(mockTable.create).toHaveBeenCalledTimes(1);
      expect(mockTable.create).toHaveBeenCalledWith({
        id: 1,
        name: 'Luke Skywalker',
        mass: 77,
        height: 172,
        homeworld_name: 'Tatooine',
        homeworld_id: '/planets/1',
      });
    });
  });
});
