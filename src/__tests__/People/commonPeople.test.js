const CommonPeople = require('../../app/People/commonPeople');

describe('CommonPeople', () => {
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

  it('should initialize a new CommonPeople instance correctly from the repository', async () => {
    const mockPeopleResult = {
      name: 'Luke Skywalker',
      mass: '77',
      height: '172',
      homeworlId: '/planets/1',
      homeworldName: 'Tatooine',
    };
    mockRepository.findById.mockResolvedValue(mockPeopleResult);

    const commonPeople = new CommonPeople(1, mockRepository, mockRequestHandler);
    await commonPeople.init();

    expect(commonPeople.getId()).toEqual(1);
    expect(commonPeople.getName()).toEqual('Luke Skywalker');
    expect(commonPeople.getMass()).toEqual(77);
    expect(commonPeople.getHeight()).toEqual(172);
    expect(commonPeople.getHomeworlId()).toEqual('/planets/1');
    expect(commonPeople.getHomeworldName()).toEqual('Tatooine');
  });

  it('should initialize a new CommonPeople instance correctly from SWAPI', async () => {
    const mockPeopleResult = {
      name: 'Luke Skywalker',
      mass: '77',
      height: '172',
      homeworld: 'https://swapi.dev/api/planets/1/',
    };
    const mockPlanetResponse = {
      name: 'Tatooine',
    };

    mockRepository.findById.mockResolvedValue(null);
    mockRequestHandler.genericRequest
      .mockResolvedValueOnce(mockPeopleResult)
      .mockResolvedValueOnce(mockPlanetResponse);

    const commonPeople = new CommonPeople(1, mockRepository, mockRequestHandler);
    await commonPeople.init();

    expect(commonPeople.getId()).toEqual(1);
    expect(commonPeople.getName()).toEqual('Luke Skywalker');
    expect(commonPeople.getMass()).toEqual(77);
    expect(commonPeople.getHeight()).toEqual(172);
    expect(commonPeople.getHomeworlId()).toEqual('/planets/1');
    expect(commonPeople.getHomeworldName()).toEqual('Tatooine');
  });
});
