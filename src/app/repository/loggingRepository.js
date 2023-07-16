class LoggingRepository {
  constructor(table) {
    this.table = table;
  }

  async saveLog(ip, header, action) {
    await this.table.create({ ip, header, action });
  }

  async getLogs() {
    return await this.table.findAll();
  }
}

module.exports = LoggingRepository;
