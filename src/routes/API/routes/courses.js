const checkAuth = require('../helpers/auth/check-auth');
const subscribeToCourse = require('../controllers/courses/subscribe');

module.exports = (app) => {
    app.put('/API/user/courses/', checkAuth, (req, res, next) => {
        subscribeToCourse({
            courseName: req.body.courseName,
        }, req.user, (err, success) => {
            if (err) {
                return next(err);
            }

            return res.status(success.status).send(success);
        });
    });
};
