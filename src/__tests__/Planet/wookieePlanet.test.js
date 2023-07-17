const WookieePlanet = require('../../app/Planet/wookieePlanet');

describe('WookieePlanet', () => {
  let mockRequestHandler;
  const SWAPI_URL = 'https://swapi.dev/api';

  beforeEach(() => {
    process.env.SWAPI_URL = SWAPI_URL;

    mockRequestHandler = {
      genericRequest: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize a new WookieePlanet instance correctly', async () => {
    const mockPlanetResult = {
      whrascwo: 'Kashyyyk',
      rrrcrahoahaoro: '12 standard',
    };

    mockRequestHandler.genericRequest.mockResolvedValue(mockPlanetResult);

    const wookieePlanet = new WookieePlanet(1, mockRequestHandler);
    await wookieePlanet.init();

    expect(wookieePlanet.getName()).toEqual('Kashyyyk');
    expect(wookieePlanet.getGravity()).toEqual(12);
  });

  it('should set gravity correctly', () => {
    const wookieePlanet = new WookieePlanet(1, mockRequestHandler);

    wookieePlanet.setGravity('12 standard');
    expect(wookieePlanet.getGravity()).toEqual(12);

    wookieePlanet.setGravity(null);
    expect(wookieePlanet.getGravity()).toBeNull();
  });
});
