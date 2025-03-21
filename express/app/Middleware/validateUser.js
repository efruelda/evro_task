const z = require('zod');

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

module.exports = (req, res, next) => {
    try {
      req.body = userSchema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
};