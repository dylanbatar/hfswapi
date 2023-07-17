const { planetFactory } = require('../../app/Planet');
const WookieePlanet = require('../../app/Planet/wookieePlanet');
const CommonPlanet = require('../../app/Planet/commonPlanet');

describe('planetFactory', () => {
  let mockRepository;
  let mockRequestHandler;
  const SWAPI_URL = 'https://swapi.dev/api';

  beforeEach(() => {
    process.env.SWAPI_URL = SWAPI_URL;

    mockRepository = {
      findById: jest.fn(),
      savePlanet: jest.fn(),
    };

    mockRequestHandler = {
      genericRequest: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an instance of WookieePlanet when wookieeLang is true', async () => {
    const mockPlanetResponse = {
      whrascwo: 'Kashyyyk',
      rrrcrahoahaoro: '1.1 asdasdaj',
    };

    mockRequestHandler.genericRequest.mockResolvedValueOnce(mockPlanetResponse);
    const planet = await planetFactory(1, null, mockRequestHandler, true);

    expect(planet).toBeInstanceOf(WookieePlanet);
    expect(planet.getName()).toEqual('Kashyyyk');
    expect(planet.getGravity()).toEqual(1.1);
  });

  it('should create an instance of CommonPlanet when wookieeLang is false', async () => {
    mockRepository.findById.mockResolvedValueOnce({ name: 'Tatooine', gravity: 1 });
    const planet = await planetFactory(1, mockRepository, mockRequestHandler, false);

    expect(planet).toBeInstanceOf(CommonPlanet);
    expect(mockRepository.findById).toHaveBeenCalledTimes(1);
    expect(planet.getName()).toEqual('Tatooine');
    expect(planet.getGravity()).toEqual(1);
  });
});
