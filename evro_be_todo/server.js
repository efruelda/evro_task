const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const todosRoutes = require('./routes/todosRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use(bodyParser.json()); // Middleware for JSON parsing

// Routes
app.get('/health-check', (req, res) => res.send('Healthy!'));
app.use('/api/todos', todosRoutes); // Mount todos routes

// Global Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
