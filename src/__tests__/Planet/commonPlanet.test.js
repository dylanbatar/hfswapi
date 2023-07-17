const CommonPlanet = require('../../app/Planet/commonPlanet');

describe('CommonPlanet', () => {
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

  it('should initialize a new CommonPlanet instance from repository', async () => {
    const mockPlanetResult = {
      name: 'Tatooine',
      gravity: 1.1,
    };

    mockRepository.findById.mockResolvedValue(mockPlanetResult);

    const commonPlanet = new CommonPlanet(1, mockRepository, mockRequestHandler);
    await commonPlanet.init();

    expect(commonPlanet.getName()).toEqual('Tatooine');
    expect(commonPlanet.getGravity()).toEqual(1.1);
  });

  it('should initialize a new CommonPlanet instance from SWAPI', async () => {
    const mockPlanetResult = {
      name: 'Tatooine',
      gravity: '1.1 standard',
    };

    mockRepository.findById.mockResolvedValue(null);
    mockRequestHandler.genericRequest.mockResolvedValue(mockPlanetResult);

    const commonPlanet = new CommonPlanet(1, mockRepository, mockRequestHandler);
    await commonPlanet.init();

    expect(commonPlanet.getName()).toEqual('Tatooine');
    expect(commonPlanet.getGravity()).toEqual(1.1);
    expect(mockRepository.savePlanet).toHaveBeenCalledWith(1, 'Tatooine', 1.1);
  });

  it('should set gravity correctly', () => {
    const commonPlanet = new CommonPlanet(1, mockRepository, mockRequestHandler);

    commonPlanet.setGravity('1.1 standard');
    expect(commonPlanet.getGravity()).toEqual(1.1);

    commonPlanet.setGravity(null);
    expect(commonPlanet.getGravity()).toBeNull();
  });
});
