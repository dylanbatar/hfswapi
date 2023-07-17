const WookieePeople = require('../../app/People/wookieePeople');

describe('WookieePeople', () => {
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

  it('should initialize a new WookieePeople instance correctly from SWAPI', async () => {
    const mockWookieeResult = {
      whrascwo: 'Chewbacca',
      scracc: '112',
      acwoahrracao: '228',
      acooscwoohoorcanwa: 'https://swapi.dev/api/planets/14/',
    };
    const mockPlanetResponse = {
      whrascwo: 'Kashyyyk',
    };

    mockRequestHandler.genericRequest
      .mockResolvedValueOnce(mockWookieeResult)
      .mockResolvedValueOnce(mockPlanetResponse);

    const wookieePeople = new WookieePeople(1, mockRequestHandler);
    await wookieePeople.init();

    expect(wookieePeople.getId()).toEqual(1);
    expect(wookieePeople.getName()).toEqual('Chewbacca');
    expect(wookieePeople.getMass()).toEqual(112);
    expect(wookieePeople.getHeight()).toEqual(228);
    expect(wookieePeople.getHomeworlId()).toEqual('/planets/14');
    expect(wookieePeople.getHomeworldName()).toEqual('Kashyyyk');
  });
});
