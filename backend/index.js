const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
const app = express();
app.use(cors())
app.use(express.json())


// const port = process.env.PORT || 5000;
const port = 5000

async function connectDB(){
await mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    dbName:"directoryListing"
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));
}
connectDB()

const productRoutes = require('./routes/products');
const materialRoutes = require('./routes/materials');
const gradeRoutes = require('./routes/grades');
const combinationRoutes = require('./routes/combinations');

app.use('/api/products', productRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/combinations', combinationRoutes);

  app.listen(port, () => console.log(`Server running on port ${port}`));