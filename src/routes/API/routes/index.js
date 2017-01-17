const octaverRoutes = require('./octaver');
const authRoutes = require('./auth-routes');
const userRoutes = require('./users');
const courseRoutes = require('./courses');
const navigationRoutes = require('./navigation');

module.exports = (app) => {
  octaverRoutes(app);
  authRoutes(app);
  userRoutes(app);
  courseRoutes(app);
  navigationRoutes(app);
};
