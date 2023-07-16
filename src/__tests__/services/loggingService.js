const { LoggingService } = require('../../app/services');

const mockLoggingResponse = [
  {
    id: 1,
    action: '/hfswapi/getPlanet/4',
    header: 'fake headers',
    ip: '::1',
    createdAt: '2023-07-16T19:37:14.399Z',
    updatedAt: '2023-07-16T19:37:14.399Z',
  },
  {
    id: 2,
    action: '/hfswapi/hfswapi/getWeightOnPlanetRandom',
    header: 'fake headers',
    ip: '::1',
    createdAt: '2023-07-16T19:37:19.249Z',
    updatedAt: '2023-07-16T19:37:19.249Z',
  },
];

const mockLoggingRepository = {
  getLogs: jest.fn(() => Promise.resolve(mockLoggingResponse)),
};

describe('LoggingService', () => {
  let loggingService;

  beforeEach(() => {
    loggingService = new LoggingService(mockLoggingRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllLogs', () => {
    it('should call getLogs method of LoggingRepository', async () => {
      await loggingService.getAllLogs();
      expect(mockLoggingRepository.getLogs).toHaveBeenCalled();
    });

    it('should return all logs from LoggingRepository', async () => {
      const logs = await loggingService.getAllLogs();
      expect(logs).toEqual(mockLoggingResponse);
    });
  });
});
