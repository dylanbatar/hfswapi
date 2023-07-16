const { PeopleService } = require('../../app/services');
const { peopleFactory } = require('../../app/People');

const mockPlanetService = {
  getPlanet: jest.fn(() => Promise.resolve({ name: 'Tatooine', gravity: 1 })),
};

const mockRepository = {
  getById: jest.fn(),
};

const mockSwapiFunction = {
  getRandomNumber: jest.fn(() => 1),
};

jest.mock('../../app/People', () => ({
  peopleFactory: jest.fn(() => ({
    getName: jest.fn(() => 'Luke Skywalker'),
    getMass: jest.fn(() => 77),
    getHeight: jest.fn(() => 172),
    getHomeworldName: jest.fn(() => 'Tatooine'),
    getHomeworlId: jest.fn(() => '/planets/1'),
    getWeightOnPlanet: jest.fn((mass, gravity) => mass * gravity),
  })),
}));

describe('PeopleService', () => {
  let peopleService;

  beforeEach(() => {
    peopleService = new PeopleService(mockRepository, mockSwapiFunction);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPeople', () => {
    it('should call peopleFactory with correct parameters', async () => {
      await peopleService.getPeople(1, false);
      expect(peopleFactory).toHaveBeenCalledWith(1, mockRepository, mockSwapiFunction, false);
    });

    it('should return people information in english', async () => {
      const result = await peopleService.getPeople(1, false);
      expect(result).toEqual({
        name: 'Luke Skywalker',
        mass: 77,
        height: 172,
        homeworldName: 'Tatooine',
        homeworldId: '/planets/1',
      });
    });
  });

  describe('getWeightOnPlanetRandom', () => {
    it('should call getRandomNumber twice', async () => {
      await peopleService.getWeightOnPlanetRandom(mockPlanetService, false);
      expect(mockSwapiFunction.getRandomNumber).toHaveBeenCalledTimes(2);
    });

    it('should call getPlanet and peopleFactory with correct parameters', async () => {
      await peopleService.getWeightOnPlanetRandom(mockPlanetService, false);
      expect(mockPlanetService.getPlanet).toHaveBeenCalledWith(1, false);
      expect(peopleFactory).toHaveBeenCalledWith(1, mockRepository, mockSwapiFunction, false);
    });

    it('should return weight on planet information', async () => {
      mockPlanetService.getPlanet.mockReturnValueOnce({ name: 'Bespin', gravity: 1.5 });

      const result = await peopleService.getWeightOnPlanetRandom(mockPlanetService, false);
      expect(result).toEqual({
        people: 'Luke Skywalker',
        mass: 77,
        weight: 115.5,
        planet: { name: 'Bespin', gravity: 1.5 },
      });
    });

    it('should return an error message if both planet are equals', async () => {
      const result = await peopleService.getWeightOnPlanetRandom(mockPlanetService, false);
      expect(result).toEqual({ error: "Tatooine is Luke Skywalker's Home planet" });
    });

    it('should return an error message if doenst has gravity of the random planet', async () => {
      mockPlanetService.getPlanet.mockReturnValueOnce({ name: 'Alderaan', gravity: 'N/A' });
      const result = await peopleService.getWeightOnPlanetRandom(mockPlanetService, false);
      expect(result).toEqual({ error: "Sorry we don't have the gravity of Alderaan 1" });
    });

    it('should return an error message if doenst has mass of the random person', async () => {
      peopleFactory.mockImplementation(() => ({
        getName: jest.fn(() => 'R4-P17'),
        getMass: jest.fn(() => null),
      }));

      const result = await peopleService.getWeightOnPlanetRandom(mockPlanetService, false);
      expect(result).toEqual({ error: "Sorry we don't have the mass of R4-P17" });
    });
  });

  describe('isOtherHomePlanet', () => {
    it('should return true if home planet and random planet are the same', () => {
      const result = peopleService.isOtherHomePlanet('Tatooine', 'Tatooine');
      expect(result).toBe(true);
    });

    it('should return false if home planet and random planet are different', () => {
      const result = peopleService.isOtherHomePlanet('Tatooine', '');
      expect(result).toBe(false);
    });
  });
});
