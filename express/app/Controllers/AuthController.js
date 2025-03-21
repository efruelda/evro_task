const AuthService = require('../Services/AuthService');
const z = require('zod');

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

class AuthController {
  async register(req, res) {
    try {
      userSchema.parse(req.body);
      
      const { email, password, name } = req.body;
      const user = await AuthService.registerUser(email, password, name);
      
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.loginUser(email, password);
      res.json({ message: 'Login successful', user, token });
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
    }
  }
}

module.exports = new AuthController();