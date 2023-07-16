const { PlanetService } = require('../../app/services');
const { planetFactory } = require('../../app/Planet');

const mockPlanet = {
  getName: jest.fn(() => 'Hoth'),
  getGravity: jest.fn(() => 1.1),
};

const mockRepository = {
  findById: jest.fn(() => Promise.resolve(mockPlanet)),
};

const mockRequestHandler = {
  genericRequest: jest.fn(),
};

jest.mock('../../app/Planet', () => ({
  planetFactory: jest.fn(() => mockPlanet),
}));

describe('PlanetService', () => {
  let planetService;

  beforeEach(() => {
    planetService = new PlanetService(mockRepository, mockRequestHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPlanet', () => {
    it('should call planetFactory with correct parameters', async () => {
      await planetService.getPlanet(1, false);
      expect(planetFactory).toHaveBeenCalledWith(1, mockRepository, mockRequestHandler, false);
    });

    it('should return planet name and gravity in english', async () => {
      const result = await planetService.getPlanet(1, false);
      expect(result).toEqual({ name: 'Hoth', gravity: 1.1 });
    });

    it('should return planet name and gravity in wookiee', async () => {
      mockPlanet.getName.mockReturnValueOnce('Hooaoac');
      const planet = await planetService.getPlanet(1, true);
      expect(planetFactory).toHaveBeenCalledWith(1, mockRepository, mockRequestHandler, true);

      expect(planet).toEqual({ name: 'Hooaoac', gravity: 1.1 });
    });
  });
});
