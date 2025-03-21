const prisma = require('../../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    async registerUser(email, password, name) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        try {
          const user = await prisma.user.create({
            data: {
              email,
              password: hashedPassword,
              name,
            },
          });
          return user;
        } catch (error) {
          if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            const err = new Error('Email already exists');
            err.statusCode = 400;
            throw err;
          }
          throw error;
        }
    }

  async loginUser(email, password) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 401;
      throw err;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      const err = new Error('Invalid credentials');
      err.statusCode = 401;
      throw err;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    await prisma.token.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 3600000), // 1 hour
      }
    });

    return { user, token };
  }
}

module.exports = new AuthService();