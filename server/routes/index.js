const postRoutes = require('./postRoutes');
const emailRoutes = require('./emailRoutes');

module.exports = (app, nodemailer) => {
  postRoutes(app);
  emailRoutes(app, nodemailer);
};
