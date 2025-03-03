const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const placeRoutes = require("./routes/placeRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const postRoutes = require('./routes/postRoutes');
const friendshipRoutes = require('./routes/friendshipRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const businessRoutes = require('./routes/businessRoutes');
const challengeRoutes = require('./routes/challengeRoutes.js');

const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/reviews", reviewRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/friendships', friendshipRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/challenges', challengeRoutes);



app.use(errorHandler);

module.exports = app;
