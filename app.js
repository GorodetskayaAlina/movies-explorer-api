require('dotenv').config();
const express = require('express');
const process = require('process');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const centralErrorHandler = require('./middlewares/centralErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  MONGO_URL,
} = require('./constants');

const { PORT = 3005 } = process.env;
const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.MONGO_URL : MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(centralErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
