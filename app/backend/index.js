const express = require('express');
const cors = require('cors');
const searchRoutes = require('./src/routes/search.routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/search', searchRoutes);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
