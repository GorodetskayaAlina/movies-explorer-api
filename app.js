require('dotenv').config();
const express = require('express');
const process = require('process');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const { errors } = require('celebrate');
const cors = require('cors');
const centralErrorHandler = require('./middlewares/centralErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3005 } = process.env;
const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(centralErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})