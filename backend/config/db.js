// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;


const mongoose = require('mongoose');


const connectDB = async () => {
const uri = process.env.MONGO_URI;
if (!uri) {
console.error('MONGO_URI not set in .env');
process.exit(1);
}
try {
await mongoose.connect(uri, {
// useNewUrlParser/useUnifiedTopology not required in mongoose v6+
});
console.log('MongoDB connected');
} catch (err) {
console.error('MongoDB connection error:', err.message);
process.exit(1);
}
};


module.exports = connectDB;

