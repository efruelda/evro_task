const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const apiRoutes = require('./app/Routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);
app.use(bodyParser.json()); // Middleware for JSON parsing

// Routes
app.get('/health-check', (req, res) => res.send('Healthy!'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
