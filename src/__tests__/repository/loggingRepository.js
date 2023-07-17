const { LoggingRepository } = require('../../app/repository');

const mockTable = {
  create: jest.fn(),
  findAll: jest.fn(),
};

describe('LoggingRepository', () => {
  let loggingRepository;

  beforeEach(() => {
    loggingRepository = new LoggingRepository(mockTable);
  });

  afterEach(() => {
    mockTable.create.mockClear();
    mockTable.findAll.mockClear();
  });

  describe('saveLog', () => {
    it('should call to table.create with correct params', async () => {
      const ip = '::1';
      const header = 'fake header';
      const action = 'hfswapi/getPeople/75';

      await loggingRepository.saveLog(ip, header, action);

      expect(mockTable.create).toHaveBeenCalledTimes(1);
      expect(mockTable.create).toHaveBeenCalledWith({ ip, header, action });
    });
  });

  describe('getLogs', () => {
    it('should call to table.create with correct params and return the result', async () => {
      const mockLogs = [{ id: 1, ip: '192.168.0.1', header: 'fake header', action: 'hfswapi/getPeople/75' }];

      mockTable.findAll.mockResolvedValue(mockLogs);

      const logs = await loggingRepository.getLogs();

      expect(mockTable.findAll).toHaveBeenCalledTimes(1);
      expect(logs).toEqual(mockLogs);
    });
  });
});
