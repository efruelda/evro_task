const z = require('zod');

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

module.exports = {
  validateLogin: (req, res, next) => {
    try {
      req.body = loginSchema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  },
  validateRegister: (req, res, next) => {
    try {
      req.body = registerSchema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  },
};