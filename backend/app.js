// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');

// const app = express();
// connectDB();

// app.use(cors());
// app.use(express.json());

// // routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/transactions', require('./routes/transactions'));

// // error handler middleware (optional)
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({ msg: 'Server error' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on ${PORT}`));
