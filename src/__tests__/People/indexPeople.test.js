const { peopleFactory } = require('../../app/People');
const WookieePeople = require('../../app/People/wookieePeople');
const CommonPeople = require('../../app/People/commonPeople');

describe('peopleFactory', () => {
  let mockRepository;
  let mockRequestHandler;
  const SWAPI_URL = 'https://swapi.dev/api';

  beforeEach(() => {
    process.env.SWAPI_URL = SWAPI_URL;

    mockRepository = {
      findById: jest.fn(),
      savePeople: jest.fn(),
    };

    mockRequestHandler = {
      genericRequest: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new CommonPeople instance', async () => {
    const mockPeopleResult = {
      name: 'Luke Skywalker',
      mass: '77',
      height: '172',
      homeworlId: '/planets/1',
      homeworldName: 'Tatooine',
    };
    mockRepository.findById.mockResolvedValue(mockPeopleResult);

    const commonPeople = await peopleFactory(1, mockRepository, mockRequestHandler, false);

    expect(commonPeople).toBeInstanceOf(CommonPeople);
    expect(commonPeople.getName()).toEqual('Luke Skywalker');
  });

  it('should create a new WookieePeople instance', async () => {
    const mockWookieeResult = {
      whrascwo: 'Chewbacca',
      scracc: '112',
      acwoahrracao: '228',
      acooscwoohoorcanwa: '/planets/14',
    };
    const mockPlanetResponse = {
      whrascwo: 'Kashyyyk',
    };

    mockRequestHandler.genericRequest
      .mockResolvedValueOnce(mockWookieeResult)
      .mockResolvedValueOnce(mockPlanetResponse);

    const wookieePeople = await peopleFactory(1, null, mockRequestHandler, true);

    expect(wookieePeople).toBeInstanceOf(WookieePeople);
    expect(wookieePeople.getName()).toEqual('Chewbacca');
  });
});
