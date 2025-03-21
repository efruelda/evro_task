const prisma = require('../../config/database');

class UserService {
  async getAllUsers() {
    return prisma.user.findMany(); // Using the User model
  }

  async createUser(userData) {
    return prisma.user.create({ data: userData }); // Using the User model
  }
}

module.exports = new UserService(); // Export an instance!