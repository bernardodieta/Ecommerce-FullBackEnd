export default class NotificationRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getNotiById = (userId) => {
    return this.dao.getNotiById(userId);
  };

  createNoti = (notification) => {
    return this.dao.createNoti(notification);
  };

  readNoti = (userId) => {
    return this.dao.readNoti(userId);
  };
}
