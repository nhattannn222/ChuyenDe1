// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');


const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());  // Parse JSON body
app.use(cors());  // Sử dụng CORS để xử lý yêu cầu từ các nguồn khác nhau

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', studentRoutes);
app.get('/health', (req, res) => {
    console.log('Health check passed');
    res.status(200).send('Healthy');
});
  

// Chạy server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
