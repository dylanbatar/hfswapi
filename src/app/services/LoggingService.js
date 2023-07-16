class LoggingService {
  constructor(loggingRepository) {
    this.loggingRepository = loggingRepository;
  }

  async getAllLogs() {
    return await this.loggingRepository.getLogs();
  }
}

module.exports = LoggingService;
